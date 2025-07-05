import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
import pytest
from services.review_service import ReviewService
from repositories.review_repository import ReviewRepository

@pytest.fixture
def review_service():
    return ReviewService(ReviewRepository())

@pytest.fixture
def review_data(sample_reservation):
    reservation, acc, user = sample_reservation
    return {
        "title": "Test Review",
        "content": "Test Content",
        "rating": "5",
        "created_at": None,
        "reservation_id": reservation.id,
        "user_id": user.id
    }

def test_create_review(db_session, review_service, review_data):
    review = review_service.create_review(db_session, review_data)
    assert review.title == review_data["title"]

def test_get_all_reviews(db_session, review_service, review_data):
    review_service.create_review(db_session, review_data)
    reviews = review_service.get_all_reviews(db_session)
    assert len(reviews) >= 1

def test_get_review_by_id(db_session, review_service, review_data):
    review = review_service.create_review(db_session, review_data)
    found = review_service.get_review_by_id(db_session, review.id)
    assert found is not None
    assert found.title == review_data["title"]

def test_delete_review(db_session, review_service, review_data):
    review = review_service.create_review(db_session, review_data)
    review_service.delete_review(db_session, review.id, review.user_id)
    found = review_service.get_review_by_id(db_session, review.id)
    assert found is None 