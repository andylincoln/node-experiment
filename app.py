from flask import Flask

app = Flask(__name__)


@app.route('/')
def hello():
    return 'I love it when a plan comes together'