import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
import pytest
from sqlalchemy.orm import Session
from models.follow import Follow
from repositories.follow_repository import FollowRepository
from models.user import User

@pytest.fixture
def sample_follow(db_session):
    # Create two users for follower and following
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
    follow_data = {
        "follower_id": user1.id,
        "following_id": user2.id,
        "created_at": None
    }
    return follow_data, user1, user2

def test_create_follow(db_session, sample_follow):
    repo = FollowRepository()
    follow_data, _, _ = sample_follow
    follow = repo.create(db_session, follow_data)
    result = repo.get_all(db_session)
    assert len(result) == 1
    assert result[0].follower_id == follow_data["follower_id"]

def test_get_follow_by_id(db_session, sample_follow):
    repo = FollowRepository()
    follow_data, _, _ = sample_follow
    follow = repo.create(db_session, follow_data)
    found = repo.get_by_id(db_session, follow.follow_id)
    assert found is not None
    assert found.follower_id == follow_data["follower_id"]

def test_update_follow(db_session, sample_follow):
    repo = FollowRepository()
    follow_data, _, _ = sample_follow
    follow = repo.create(db_session, follow_data)
    update_data = {"created_at": None}  # No updatable string field, just test no error
    updated = repo.update(db_session, follow, update_data)
    assert updated.follower_id == follow_data["follower_id"]

def test_delete_follow(db_session, sample_follow):
    repo = FollowRepository()
    follow_data, _, _ = sample_follow
    follow = repo.create(db_session, follow_data)
    repo.delete(db_session, follow)
    found = repo.get_by_id(db_session, follow.follow_id)
    assert found is None 