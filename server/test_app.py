import json
import logging

from app import TodoItem, db

logging.basicConfig()
logging.getLogger("sqlalchemy.engine").setLevel(logging.INFO)


def test_get_all(client):
    item1 = TodoItem(completed=False, text="Test item text")
    db.session.add(item1)
    item2 = TodoItem(completed=False, text="Test item two text")
    db.session.add(item2)
    item3 = TodoItem(completed=True, text="Test item three text")
    db.session.add(item3)
    db.session.flush()
    response = client.get("/todo/")
    actual = json.loads(response.data)
    expected = {
        "status": "success",
        "data": [
            {"id": item1.id, "completed": False, "text": "Test item text"},
            {"id": item2.id, "completed": False, "text": "Test item two text"},
            {"id": item3.id, "completed": True, "text": "Test item three text"},
        ],
    }
    assert actual == expected


def test_add_item(client):
    client.post("/todo/", json={"completed": False, "text": "Add new item"})
    actual = TodoItem.query.filter(TodoItem.text == "Add new item").one()
    assert actual.text == "Add new item"
    assert actual.completed == False


def test_delete_item(client):
    delete_me = TodoItem(id=1, completed=False, text="Delete this item")
    db.session.add(delete_me)
    db.session.flush()
    client.delete("/todo/1/")
    actual = TodoItem.query.filter_by(id=1).first()
    assert actual is None


def test_update_item_completed(client):
    item = TodoItem(id=1, completed=False, text="Test item three text")
    db.session.add(item)
    db.session.flush()
    client.put("/todo/1/", json={"completed": True})
    actual = TodoItem.query.filter_by(id=1).one()
    assert actual.completed


def test_update_item_text(client):
    item = TodoItem(id=1, completed=False, text="Test item three text")
    db.session.add(item)
    db.session.flush()
    client.put("/todo/1/", json={"text": "My new text"})
    actual = TodoItem.query.filter_by(id=1).one()
    assert actual.text == "My new text"
