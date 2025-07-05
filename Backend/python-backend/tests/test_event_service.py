import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
import pytest
from services.event_service import EventService
from repositories.event_repository import EventRepository
from models.user import User

@pytest.fixture
def event_service():
    return EventService(EventRepository())

@pytest.fixture
def event_data(sample_user, db_session):
    user = User(**sample_user)
    db_session.add(user)
    db_session.commit()
    db_session.refresh(user)
    return {
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

def test_create_event(db_session, event_service, event_data):
    event = event_service.create_event(db_session, event_data)
    assert event.title == event_data["title"]

def test_get_all_events(db_session, event_service, event_data):
    event_service.create_event(db_session, event_data)
    events = event_service.get_all_events(db_session)
    assert len(events) >= 1

def test_get_event_by_id(db_session, event_service, event_data):
    event = event_service.create_event(db_session, event_data)
    found = event_service.get_event_by_id(db_session, event.id)
    assert found is not None
    assert found.title == event_data["title"]

def test_update_event(db_session, event_service, event_data):
    event = event_service.create_event(db_session, event_data)
    update_data = {"title": "Updated Event"}
    updated = event_service.update_event(db_session, event.id, update_data)
    assert updated.title == "Updated Event"

def test_delete_event(db_session, event_service, event_data):
    event = event_service.create_event(db_session, event_data)
    event_service.delete_event(db_session, event.id, event.creator_id)
    found = event_service.get_event_by_id(db_session, event.id)
    assert found is None 