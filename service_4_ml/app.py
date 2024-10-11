import os
import pickle
from flask import Flask, jsonify, request
from flask_cors import CORS
# nlp
import pandas as pd
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer

app = Flask(__name__)

CORS(app)

# load the model
if os.path.isfile("D:/machine learning/basics/NLP/pomodoro/task_segmentation.pkl"):
    with open("D:/machine learning/basics/NLP/pomodoro/task_segmentation.pkl", "rb") as f:
        model, topic_labels, tfidf_vectorizer = pickle.load(f)
else:
    raise FileNotFoundError


@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json(force = True)

    # preprocess
    def preprocess(sent):
        stop_words = set(stopwords.words("english"))
        lemmatizer = WordNetLemmatizer()
        text = sent.lower()
        # remove punctuation and digits
        text = ''.join([char for char in text if char.isalpha() or char == ' ' or char == '/'])
        # remove stop words 
        tokens = text.split()
        tokens = [lemmatizer.lemmatize(word) for word in tokens if word not in stop_words]
        return ' '.join(tokens)

    cleaned_corpus = [preprocess(sent) for sent in data] 

    # tfdf vectors
    X = tfidf_vectorizer.transform(cleaned_corpus).toarray()

    new_cluster = model.predict(X)
    new_df = pd.DataFrame({'Title': data, 'Cluster': new_cluster})
    new_df['Topic'] = new_df['Cluster'].map(topic_labels)

    return jsonify({
        'df': new_df.to_json(orient='records'), 
        'topic_labels': topic_labels
    })


if __name__=='__main__':
    app.run(debug = True)