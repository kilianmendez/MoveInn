import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
import pytest
from sqlalchemy.orm import Session
from models.recommendation import Recommendation
from repositories.recommendation_repository import RecommendationRepository
from models.user import User

@pytest.fixture
def sample_recommendation(sample_user, db_session):
    user = User(**sample_user)
    db_session.add(user)
    db_session.commit()
    db_session.refresh(user)
    rec_data = {
        "title": "Test Recommendation",
        "user_id": user.id,
        "description": "Test Description",
        "category": "Test Category",
        "address": "123 Rec St",
        "city": "Test City",
        "country": "Test Country",
        "rating": "5",
        "created_at": None,
        "tags": None
    }
    return rec_data, user

def test_create_recommendation(db_session, sample_recommendation):
    repo = RecommendationRepository()
    rec_data, _ = sample_recommendation
    rec = repo.create(db_session, rec_data)
    result = repo.get_all(db_session)
    assert len(result) == 1
    assert result[0].title == rec_data["title"]

def test_get_recommendation_by_id(db_session, sample_recommendation):
    repo = RecommendationRepository()
    rec_data, _ = sample_recommendation
    rec = repo.create(db_session, rec_data)
    found = repo.get_by_id(db_session, rec.id)
    assert found is not None
    assert found.title == rec_data["title"]

def test_update_recommendation(db_session, sample_recommendation):
    repo = RecommendationRepository()
    rec_data, _ = sample_recommendation
    rec = repo.create(db_session, rec_data)
    update_data = {"title": "Updated Recommendation"}
    updated = repo.update(db_session, rec, update_data)
    assert updated.title == "Updated Recommendation"

def test_delete_recommendation(db_session, sample_recommendation):
    repo = RecommendationRepository()
    rec_data, _ = sample_recommendation
    rec = repo.create(db_session, rec_data)
    repo.delete(db_session, rec)
    found = repo.get_by_id(db_session, rec.id)
    assert found is None 