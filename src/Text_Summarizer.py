import sys
import math
import urllib.request
import re
import PyPDF2
import nltk
from nltk.stem import WordNetLemmatizer 
import spacy

nltk.download('wordnet')

nlp = spacy.load('en_core_web_sm')
lemmatizer = WordNetLemmatizer() 

def file_text(filepath):
    with open(filepath) as f:
        text = f.read().replace("\n", '')
        return text

def pdfReader(pdf_path):
    with open(pdf_path, 'rb') as pdfFileObject:
        pdfReader = PyPDF2.PdfFileReader(pdfFileObject)
        count = pdfReader.numPages
        c = input("Do you want to read entire pdf ?[Y]/N  :  ")
        if c.lower() == 'n':
            start_page  = int(input("Enter start page number (Indexing start from 0) :  "))
            end_page = int(input(f"Enter end page number (Less than {count}) : "))
            if start_page < 0 or start_page >= count or end_page < 0 or end_page >= count:
                print("\nInvalid page range")
                sys.exit()

        for i in range(start_page, end_page + 1):
            page = pdfReader.getPage(i)

        return page.extractText()

input_text_type = int(input("Select one way of inputting your text : \n1. Type your Text(or Copy-Paste)\n2. Load from .txt file\n3. Load from .pdf file\n\n"))

if input_text_type == 1:
    text = input("Enter your text : \n\n")

elif input_text_type == 2:
    txt_path = input("Enter file path :  ")
    text = file_text(txt_path)
    
elif input_text_type == 3:
    file_path = input("Enter file path :  ")
    text = pdfReader(file_path)
    
else:
    print("Sorry! Wrong Input, Try Again.")
    sys.exit()

def frequency_matrix(sentences):
    freq_matrix = {}
    stopWords = nlp.Defaults.stop_words

    for sent in sentences:
        freq_table = {}
        words = [word.text.lower() for word in sent if word.text.isalnum()]
        for word in words:  
            word = lemmatizer.lemmatize(word)
            if word not in stopWords:
                freq_table[word] = freq_table.get(word, 0) + 1

        freq_matrix[sent[:15]] = freq_table

    return freq_matrix

def tf_matrix(freq_matrix):
    tf_matrix = {}
    for sent, freq_table in freq_matrix.items():
        total_words_in_sentence = len(freq_table)
        tf_matrix[sent] = {word: count / total_words_in_sentence for word, count in freq_table.items()}
    return tf_matrix

def sentences_per_words(freq_matrix):
    sent_per_words = {}
    for f_table in freq_matrix.values():
        for word in f_table:
            sent_per_words[word] = sent_per_words.get(word, 0) + 1
    return sent_per_words

def idf_matrix(freq_matrix, sent_per_words, total_sentences):
    idf_matrix = {}
    for sent, f_table in freq_matrix.items():
        idf_matrix[sent] = {word: math.log10(total_sentences / float(sent_per_words[word])) for word in f_table}
    return idf_matrix

def tf_idf_matrix(tf_matrix, idf_matrix):
    return {sent: {word: tf_value * idf_matrix[sent][word] for word, tf_value in f_table.items()} for sent, f_table in tf_matrix.items()}

def score_sentences(tf_idf_matrix):
    return {sent: sum(f_table.values()) / len(f_table) for sent, f_table in tf_idf_matrix.items()}

def average_score(sentence_score):
    return sum(sentence_score.values()) / len(sentence_score)

def create_summary(sentences, sentence_score, threshold):
    return " ".join([sentence.text for sentence in sentences if sentence[:15] in sentence_score and sentence_score[sentence[:15]] >= threshold])

text = nlp(text)
sentences = list(text.sents)
freq_matrix = frequency_matrix(sentences)
tf_matrix = tf_matrix(freq_matrix)
num_sent_per_words = sentences_per_words(freq_matrix)
idf_matrix = idf_matrix(freq_matrix, num_sent_per_words, len(sentences))
tf_idf_matrix = tf_idf_matrix(tf_matrix, idf_matrix)
sentence_scores = score_sentences(tf_idf_matrix)
threshold = average_score(sentence_scores) * 1.3
summary = create_summary(sentences, sentence_scores, threshold)

print("\n\n" + "*"*20 + " Summary " + "*"*20 + "\n")
print(summary)
