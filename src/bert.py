from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import re

def sbert_summary(text, num_sentences=3):
    sentences = re.split(r'(?<=[.!?])\s+', text.strip())
    if len(sentences) <= num_sentences:
        return ' '.join(sentences)
    model = SentenceTransformer('all-MiniLM-L6-v2')
    embeddings = model.encode(sentences)
    doc_embedding = np.mean(embeddings, axis=0)
    similarities = cosine_similarity([doc_embedding], embeddings)[0]
    top_idx = similarities.argsort()[-num_sentences:]
    top_idx.sort()
    summary = ' '.join([sentences[i] for i in top_idx])
    return summary

if __name__ == "__main__":
    text = "The Avengers are a team of superheroes appearing in American comic books published by Marvel Comics, created by writer-editor Stan Lee and artist/co-plotter Jack Kirby. The team made its debut in The Avengers #1 (cover-dated September 1963). Labeled 'Earth's Mightiest Heroes', the original Avengers consisted of Iron Man, Ant-Man, Hulk, Thor, and Wasp. Captain America was discovered trapped in ice in issue #4, and joined the group after they revived him. The Avengers are an all-star ensemble cast of established superhero characters from the Marvel Comics portfolio."
    print(sbert_summary(text, num_sentences=3))