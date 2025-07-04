from sqlalchemy.orm import Session
from models.recommendation import Recommendation
from .base_repository import BaseRepository

class RecommendationRepository(BaseRepository[Recommendation]):
    def __init__(self):
        super().__init__(Recommendation)

    # Add recommendation-specific queries here as needed 