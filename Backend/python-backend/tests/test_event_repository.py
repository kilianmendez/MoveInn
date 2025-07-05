import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
import pytest
from sqlalchemy.orm import Session
from models.event import Event
from repositories.event_repository import EventRepository
from models.user import User

@pytest.fixture
def sample_event(sample_user, db_session):
    user = User(**sample_user)
    db_session.add(user)
    db_session.commit()
    db_session.refresh(user)
    event_data = {
        "title": "Test Event",
        "creator_id": user.id,
        "date": None,
        "location": "Test Location",
        "address": "123 Event St",
        "city": "Test City",
        "country": "Test Country",
        "attendees_count": 0,
        "max_attendees": 10,
        "category": "Test Category",
        "description": "Test Description",
        "image_url": None,
        "tags": None
    }
    return event_data, user

def test_create_event(db_session, sample_event):
    repo = EventRepository()
    event_data, _ = sample_event
    event = repo.create(db_session, event_data)
    result = repo.get_all(db_session)
    assert len(result) == 1
    assert result[0].title == event_data["title"]

def test_get_event_by_id(db_session, sample_event):
    repo = EventRepository()
    event_data, _ = sample_event
    event = repo.create(db_session, event_data)
    found = repo.get_by_id(db_session, event.id)
    assert found is not None
    assert found.title == event_data["title"]

def test_update_event(db_session, sample_event):
    repo = EventRepository()
    event_data, _ = sample_event
    event = repo.create(db_session, event_data)
    update_data = {"title": "Updated Event"}
    updated = repo.update(db_session, event, update_data)
    assert updated.title == "Updated Event"

def test_delete_event(db_session, sample_event):
    repo = EventRepository()
    event_data, _ = sample_event
    event = repo.create(db_session, event_data)
    repo.delete(db_session, event)
    found = repo.get_by_id(db_session, event.id)
    assert found is None 