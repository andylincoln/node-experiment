import json

from app import TodoItem, db

def test_get_all(client):
    item1 = TodoItem(completed=False, text="Test item text")
    db.session.add(item1)
    item2 = TodoItem(completed=False, text="Test item two text")
    db.session.add(item2)
    item3 = TodoItem(completed=True, text="Test item three text")
    db.session.add(item3)
    db.session.flush()
    response = client.get('/todo/')
    actual = json.loads(response.data)
    expected = {
        "status": "success",
        "data": [
            {"id": item1.id, "completed": False, "text": "Test item text"},
            {"id": item2.id, "completed": False, "text": "Test item two text"},
            {"id": item3.id, "completed": True, "text": "Test item three text"}
        ]
    }
    assert actual == expected
