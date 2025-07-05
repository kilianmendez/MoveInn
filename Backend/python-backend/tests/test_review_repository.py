import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
import pytest
from sqlalchemy.orm import Session
from models.review import Review
from repositories.review_repository import ReviewRepository

@pytest.fixture
def sample_review(sample_reservation, db_session):
    reservation, acc, user = sample_reservation
    review_data = {
        "title": "Test Review",
        "content": "Test Content",
        "rating": "5",
        "created_at": None,
        "reservation_id": reservation.id,
        "user_id": user.id
    }
    return review_data, reservation, acc, user

def test_create_review(db_session, sample_review):
    repo = ReviewRepository()
    review_data, _, _, _ = sample_review
    review = repo.create(db_session, review_data)
    result = repo.get_all(db_session)
    assert len(result) == 1
    assert result[0].title == review_data["title"]

def test_get_review_by_id(db_session, sample_review):
    repo = ReviewRepository()
    review_data, _, _, _ = sample_review
    review = repo.create(db_session, review_data)
    found = repo.get_by_id(db_session, review.id)
    assert found is not None
    assert found.title == review_data["title"]

def test_update_review(db_session, sample_review):
    repo = ReviewRepository()
    review_data, _, _, _ = sample_review
    review = repo.create(db_session, review_data)
    update_data = {"title": "Updated Review"}
    updated = repo.update(db_session, review, update_data)
    assert updated.title == "Updated Review"

def test_delete_review(db_session, sample_review):
    repo = ReviewRepository()
    review_data, _, _, _ = sample_review
    review = repo.create(db_session, review_data)
    repo.delete(db_session, review)
    found = repo.get_by_id(db_session, review.id)
    assert found is None 