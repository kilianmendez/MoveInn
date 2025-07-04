from sqlalchemy.orm import Session
from models.recommendation import Recommendation
from .base_repository import BaseRepository
from fastapi import Depends
from database import get_db

class RecommendationRepository(BaseRepository[Recommendation]):
    def __init__(self):
        super().__init__(Recommendation)

    # Add recommendation-specific queries here as needed 

def get_recommendation_repository(db: Session = Depends(get_db)):
    return RecommendationRepository() 