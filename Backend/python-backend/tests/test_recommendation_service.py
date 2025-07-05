import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
import pytest
from services.recommendation_service import RecommendationService
from repositories.recommendation_repository import RecommendationRepository
from models.user import User

@pytest.fixture
def recommendation_service():
    return RecommendationService(RecommendationRepository())

@pytest.fixture
def recommendation_data(sample_user, db_session):
    user = User(**sample_user)
    db_session.add(user)
    db_session.commit()
    db_session.refresh(user)
    return {
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

def test_create_recommendation(db_session, recommendation_service, recommendation_data):
    rec = recommendation_service.create_recommendation(db_session, recommendation_data)
    assert rec.title == recommendation_data["title"]

def test_get_all_recommendations(db_session, recommendation_service, recommendation_data):
    recommendation_service.create_recommendation(db_session, recommendation_data)
    recs = recommendation_service.get_all_recommendations(db_session)
    assert len(recs) >= 1

def test_get_recommendation_by_id(db_session, recommendation_service, recommendation_data):
    rec = recommendation_service.create_recommendation(db_session, recommendation_data)
    found = recommendation_service.get_recommendation_by_id(db_session, rec.id)
    assert found is not None
    assert found.title == recommendation_data["title"]

def test_update_recommendation(db_session, recommendation_service, recommendation_data):
    rec = recommendation_service.create_recommendation(db_session, recommendation_data)
    update_data = {"title": "Updated Recommendation"}
    updated = recommendation_service.update_recommendation(db_session, rec.id, update_data)
    assert updated.title == "Updated Recommendation"

def test_delete_recommendation(db_session, recommendation_service, recommendation_data):
    rec = recommendation_service.create_recommendation(db_session, recommendation_data)
    recommendation_service.delete_recommendation(db_session, rec.id, rec.user_id)
    found = recommendation_service.get_recommendation_by_id(db_session, rec.id)
    assert found is None 