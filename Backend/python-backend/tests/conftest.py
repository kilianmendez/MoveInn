import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Base
from models.user import User

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

import uuid
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