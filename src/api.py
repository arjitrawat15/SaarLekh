from fastapi import FastAPI, Request, UploadFile, File
from pydantic import BaseModel
from main import generate_questions
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
from transformers import TrOCRProcessor, VisionEncoderDecoderModel
import io
from bert import sbert_summary

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

processor = TrOCRProcessor.from_pretrained("microsoft/trocr-base-printed")
trocr_model = VisionEncoderDecoderModel.from_pretrained("microsoft/trocr-base-printed")

class Passage(BaseModel):
    text: str

@app.post("/generate-questions")
def get_questions(passage: Passage):
    questions = generate_questions(passage.text)
    return {"questions": questions}

@app.post("/image-to-text")
async def image_to_text(file: UploadFile = File(...)):
    image_bytes = await file.read()
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    image = image.resize((1280, 720)) 
    pixel_values = processor(images=image, return_tensors="pt").pixel_values
    generated_ids = trocr_model.generate(pixel_values)
    predicted_text = processor.batch_decode(generated_ids, skip_special_tokens=True)[0]
    image.save("debug_uploaded_image.jpg")
    return {"text": predicted_text}

@app.post("/image-to-summary")
async def image_to_summary(file: UploadFile = File(...)):
    image_bytes = await file.read()
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    image = image.resize((1280, 720))
    pixel_values = processor(images=image, return_tensors="pt").pixel_values
    generated_ids = trocr_model.generate(pixel_values)
    extracted_text = processor.batch_decode(generated_ids, skip_special_tokens=True)[0]
    summary = sbert_summary(extracted_text, num_sentences=3)
    return {"summary": summary}