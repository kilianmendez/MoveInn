from sqlalchemy.orm import Session
from models.accommodation import Accommodation
from .base_repository import BaseRepository

class AccommodationRepository(BaseRepository[Accommodation]):
    def __init__(self):
        super().__init__(Accommodation)

    # Add accommodation-specific queries here as needed 