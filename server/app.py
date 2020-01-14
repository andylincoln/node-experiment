import os
from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__, static_folder="../static")
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:example@database:5432/todo'
db = SQLAlchemy(app)

class TodoItem(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    text = db.Column(db.Text, nullable=False, default="")
    completed = db.Column(db.Boolean, nullable=False, default=False)

    def __repr__(self):
        return f'<TodoItem {self.id} {self.text} {self.completed}>'



@app.route('/')
def hello():
    return render_template("app.html")
