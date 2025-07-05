import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
import pytest
from sqlalchemy.orm import Session
from models.accommodation import Accommodation
from models.user import User
from repositories.accommodation_repository import AccommodationRepository
from repositories.user_repository import UserRepository

@pytest.fixture
def sample_accommodation(sample_user, db_session):
    # Create a user to own the accommodation
    user_repo = UserRepository()
    user = User(**sample_user)
    db_session.add(user)
    db_session.commit()
    db_session.refresh(user)
    acc_data = {
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
    return acc_data

def test_create_accommodation(db_session, sample_accommodation):
    repo = AccommodationRepository()
    acc = repo.create(db_session, sample_accommodation)
    result = repo.get_all(db_session)
    assert len(result) == 1
    assert result[0].title == sample_accommodation["title"]

def test_get_by_id(db_session, sample_accommodation):
    repo = AccommodationRepository()
    acc = repo.create(db_session, sample_accommodation)
    found = repo.get_by_id(db_session, acc.id)
    assert found is not None
    assert found.title == sample_accommodation["title"]

def test_update_accommodation(db_session, sample_accommodation):
    repo = AccommodationRepository()
    acc = repo.create(db_session, sample_accommodation)
    update_data = {"title": "Updated Title"}
    updated = repo.update(db_session, acc, update_data)
    assert updated.title == "Updated Title"

def test_delete_accommodation(db_session, sample_accommodation):
    repo = AccommodationRepository()
    acc = repo.create(db_session, sample_accommodation)
    repo.delete(db_session, acc)
    found = repo.get_by_id(db_session, acc.id)
    assert found is None 