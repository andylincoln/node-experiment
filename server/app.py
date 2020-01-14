import os
from flask import Flask, render_template

app = Flask(__name__, static_folder="../static")

@app.route('/')
def hello():
    return render_template("app.html")
