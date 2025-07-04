from sqlalchemy.orm import Session
from models.accommodation import Accommodation
from .base_repository import BaseRepository
from fastapi import Depends
from database import get_db

class AccommodationRepository(BaseRepository[Accommodation]):
    def __init__(self):
        super().__init__(Accommodation)

    # Add accommodation-specific queries here as needed 

def get_accommodation_repository(db: Session = Depends(get_db)):
    return AccommodationRepository() 