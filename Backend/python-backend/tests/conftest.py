import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Base
from models.user import User
from models.accommodation import Accommodation
from models.reservation import Reservation
import uuid
from datetime import datetime

# Use in-memory SQLite for fast, isolated tests
test_engine = create_engine('sqlite:///:memory:', connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=test_engine)

@pytest.fixture(scope="session", autouse=True)
def setup_database():
    # Create all tables
    Base.metadata.create_all(bind=test_engine)
    yield
    # Drop all tables after tests
    Base.metadata.drop_all(bind=test_engine)

@pytest.fixture(scope="function")
def db_session(setup_database):
    session = TestingSessionLocal()
    try:
        yield session
    finally:
        session.close()

@pytest.fixture
def sample_user():
    unique_mail = f"test_{uuid.uuid4()}@example.com"
    return {
        "name": "Test",
        "last_name": "User",
        "mail": unique_mail,
        "password": "testpass",
        "role": "User",
        "biography": "Test biography",
        "avatar_url": "http://example.com/avatar.png",
        "school": "Test School",
        "degree": "Test Degree",
        "nationality": "Test Nationality",
        "city": "Test City",
        "erasmus_country": "Test Country",
        "erasmus_date": None,
        "phone": "123456789"
    }

@pytest.fixture
def sample_accommodation(sample_user, db_session):
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
    acc = Accommodation(**acc_data)
    db_session.add(acc)
    db_session.commit()
    db_session.refresh(acc)
    return acc, user

@pytest.fixture
def sample_reservation(sample_accommodation, db_session):
    acc, user = sample_accommodation
    now = datetime.now()
    reservation_data = {
        "start_date": now,
        "end_date": now,
        "total_price": 500,
        "status": "Pending",
        "user_id": user.id,
        "accommodation_id": acc.id
    }
    reservation = Reservation(**reservation_data)
    db_session.add(reservation)
    db_session.commit()
    db_session.refresh(reservation)
    return reservation, acc, user 