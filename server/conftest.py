import pytest

from app import app, db, TodoItem


@pytest.fixture
def client():
    app.config["TESTING"] = True

    with app.test_client() as client:
        yield client


@pytest.fixture(autouse=True)
def auto_rollback():
    for item in TodoItem.query.all():
        db.session.delete(item)
    db.session.flush()
    db.commit = lambda: None
    yield
    db.session.rollback()
