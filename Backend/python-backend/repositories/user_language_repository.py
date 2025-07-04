from sqlalchemy.orm import Session
from models.user_language import UserLanguage
from .base_repository import BaseRepository
from fastapi import Depends
from database import get_db

class UserLanguageRepository(BaseRepository[UserLanguage]):
    def __init__(self):
        super().__init__(UserLanguage)

    # Add user-language-specific queries here as needed 

def get_user_language_repository(db: Session = Depends(get_db)):
    return UserLanguageRepository() 