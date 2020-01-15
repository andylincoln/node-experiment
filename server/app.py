import os
from flask import Flask, render_template, request
from flask.views import MethodView
from flask_sqlalchemy import SQLAlchemy
from marshmallow import Schema, fields, post_load

app = Flask(__name__, static_folder="../static")
app.config[
    "SQLALCHEMY_DATABASE_URI"
] = "postgresql://postgres:example@database:5432/todo"
db = SQLAlchemy(app)


class TodoItem(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    text = db.Column(db.Text, nullable=False, default="")
    completed = db.Column(db.Boolean, nullable=False, default=False)

    def __repr__(self):
        return f"<TodoItem {self.id} {self.text} {self.completed}>"


class TodoItemSchema(Schema):
    id = fields.Integer()
    text = fields.String()
    completed = fields.Boolean()

    @post_load
    def get_model(self, item, **kwargs):
        if item.get("id"):
            todo_item = TodoItem.query.filter_by(id=item["id"]).one()
            for key, value in item.items():
                setattr(todo_item, key, value)
            return todo_item
        else:
            return TodoItem(**item)


class TodoAPI(MethodView):
    def get(self):
        items = TodoItem.query.all()
        schema = TodoItemSchema(many=True)
        return {"status": "success", "data": schema.dump(items)}

    def post(self):
        payload = request.get_json(force=True)
        schema = TodoItemSchema()
        item = schema.load(payload)
        db.session.add(item)
        db.session.flush()
        db.session.commit()
        return ""

    def delete(self, todo_item_id):
        item = TodoItem.query.filter_by(id=todo_item_id).first_or_404()
        db.session.delete(item)
        db.session.flush()
        db.session.commit()
        return ""

    def put(self, todo_item_id):
        payload = request.get_json(force=True)
        payload["id"] = todo_item_id
        schema = TodoItemSchema()
        item = schema.load(payload)
        db.session.add(item)
        db.session.flush()
        db.session.commit()
        return ""


todo_item_view = TodoAPI.as_view("todo_api")
app.add_url_rule("/todo/", view_func=todo_item_view, methods=["GET", "POST"])
app.add_url_rule(
    "/todo/<int:todo_item_id>/", view_func=todo_item_view, methods=["PUT", "DELETE"]
)


@app.route("/")
def hello():
    return render_template("app.html")
