from sqlalchemy.orm import Session
from models.review import Review
from .base_repository import BaseRepository
from fastapi import Depends
from database import get_db

class ReviewRepository(BaseRepository[Review]):
    def __init__(self):
        super().__init__(Review)

    # Add review-specific queries here as needed 

def get_review_repository(db: Session = Depends(get_db)):
    return ReviewRepository() 