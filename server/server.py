from __future__ import print_function # In python 2.7
import sys
from flask import Flask
import json

app = Flask(__name__)

@app.route("/home")
def home():
    return ("Hello World")

@app.route("/question")
def question():
    print('Hello world!', file=sys.stderr)
    f = open("questions/0001.json")
    data = json.load(f)
    return data

if __name__ == "__main__":
    app.run(debug=True)