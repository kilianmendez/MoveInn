from sqlalchemy.orm import Session
from models.speciality import Speciality
from .base_repository import BaseRepository

class SpecialityRepository(BaseRepository[Speciality]):
    def __init__(self):
        super().__init__(Speciality)

    # Add speciality-specific queries here as needed 