import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
import pytest
from services.follow_service import FollowService
from repositories.follow_repository import FollowRepository
from models.user import User
from models.follow import Follow

@pytest.fixture
def follow_service():
    return FollowService(FollowRepository())

@pytest.fixture
def follow_data(db_session):
    import uuid
    user1 = User(
        name="Follower",
        last_name="User",
        mail=f"follower_{uuid.uuid4()}@example.com",
        password="testpass",
        role="User",
        biography="Test biography",
        avatar_url="http://example.com/avatar1.png",
        school="Test School",
        degree="Test Degree",
        nationality="Test Nationality",
        city="Test City",
        erasmus_country="Test Country",
        erasmus_date=None,
        phone="123456789"
    )
    user2 = User(
        name="Following",
        last_name="User",
        mail=f"following_{uuid.uuid4()}@example.com",
        password="testpass",
        role="User",
        biography="Test biography",
        avatar_url="http://example.com/avatar2.png",
        school="Test School",
        degree="Test Degree",
        nationality="Test Nationality",
        city="Test City",
        erasmus_country="Test Country",
        erasmus_date=None,
        phone="987654321"
    )
    db_session.add(user1)
    db_session.add(user2)
    db_session.commit()
    db_session.refresh(user1)
    db_session.refresh(user2)
    return {
        "follower_id": user1.id,
        "following_id": user2.id,
        "created_at": None
    }, user1, user2

def test_get_all_follows(db_session, follow_service, follow_data):
    follow_data_dict, _, _ = follow_data
    follow = Follow(**follow_data_dict)
    db_session.add(follow)
    db_session.commit()
    follows = follow_service.get_all_follows(db_session)
    assert len(follows) >= 1

def test_get_follow_by_id(db_session, follow_service, follow_data):
    follow_data_dict, _, _ = follow_data
    follow = Follow(**follow_data_dict)
    db_session.add(follow)
    db_session.commit()
    found = follow_service.get_follow_by_id(db_session, follow.follow_id)
    assert found is not None
    assert found.follower_id == follow_data_dict["follower_id"] 