from sqlalchemy.orm import Session
from models.speciality import Speciality
from .base_repository import BaseRepository
from fastapi import Depends
from database import get_db

class SpecialityRepository(BaseRepository[Speciality]):
    def __init__(self):
        super().__init__(Speciality)

    # Add speciality-specific queries here as needed 

def get_speciality_repository(db: Session = Depends(get_db)):
    return SpecialityRepository() 