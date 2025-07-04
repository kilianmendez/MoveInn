from sqlalchemy.orm import Session
from models.review import Review
from .base_repository import BaseRepository

class ReviewRepository(BaseRepository[Review]):
    def __init__(self):
        super().__init__(Review)

    # Add review-specific queries here as needed 