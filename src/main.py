import re
from transformers import T5Tokenizer, T5ForConditionalGeneration

def split_sentences(text):
    return re.split(r'(?<=[.!?])\s+', text.strip())

model_name = "valhalla/t5-base-qg-hl"
tokenizer = T5Tokenizer.from_pretrained(model_name)
model = T5ForConditionalGeneration.from_pretrained(model_name)

def generate_questions(passage):
    sentences = split_sentences(passage)
    questions = []

    for sent in sentences:
        marked_text = passage.replace(sent, f"<hl> {sent} <hl>")
        input_text = f"generate question: {marked_text}"

        inputs = tokenizer.encode(input_text, return_tensors="pt", max_length=512, truncation=True)
        outputs = model.generate(inputs, max_length=64, num_beams=4, early_stopping=True)

        question = tokenizer.decode(outputs[0], skip_special_tokens=True)
        questions.append(question)

    return questions

if __name__ == "__main__":
    passage = "Mr. Smith bought cheapsite.com for 1.5 million dollars, i.e. he paid a lot for it. Did he mind? Adam Jones Jr. thinks he didn't. In any case, this isn't true... Well, with a probability of .9 it isn't."
    questions = generate_questions(passage)
    for q in questions:
        print("Q:", q)

