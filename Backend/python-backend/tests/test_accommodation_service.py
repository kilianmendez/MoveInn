import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
import pytest
from services.accommodation_service import AccommodationService
from repositories.accommodation_repository import AccommodationRepository

@pytest.fixture
def accommodation_service():
    return AccommodationService(AccommodationRepository())

@pytest.fixture
def accommodation_data(sample_user, db_session):
    from models.user import User
    user = User(**sample_user)
    db_session.add(user)
    db_session.commit()
    db_session.refresh(user)
    return {
        "title": "Test Accommodation",
        "address": "123 Test St",
        "owner_id": user.id,
        "description": "A nice place",
        "city": "Test City",
        "country": "Test Country",
        "price_per_month": 1000,
        "number_of_rooms": 2,
        "bathrooms": 1,
        "square_meters": 50,
        "has_wifi": True,
        "available_from": None,
        "available_to": None,
        "accommodation_type": "Apartment"
    }

def test_create_accommodation(db_session, accommodation_service, accommodation_data):
    acc = accommodation_service.create_accommodation(db_session, accommodation_data)
    assert acc.title == accommodation_data["title"]

def test_get_all_accommodations(db_session, accommodation_service, accommodation_data):
    accommodation_service.create_accommodation(db_session, accommodation_data)
    accs = accommodation_service.get_all_accommodations(db_session)
    assert len(accs) >= 1

def test_get_accommodation_by_id(db_session, accommodation_service, accommodation_data):
    acc = accommodation_service.create_accommodation(db_session, accommodation_data)
    found = accommodation_service.get_accommodation_by_id(db_session, acc.id)
    assert found is not None
    assert found.title == accommodation_data["title"]

def test_update_accommodation(db_session, accommodation_service, accommodation_data):
    acc = accommodation_service.create_accommodation(db_session, accommodation_data)
    update_data = {"title": "Updated Title"}
    updated = accommodation_service.update_accommodation(db_session, acc.id, update_data)
    assert updated.title == "Updated Title"

def test_delete_accommodation(db_session, accommodation_service, accommodation_data):
    acc = accommodation_service.create_accommodation(db_session, accommodation_data)
    accommodation_service.delete_accommodation(db_session, acc.id, acc.owner_id)
    found = accommodation_service.get_accommodation_by_id(db_session, acc.id)
    assert found is None 