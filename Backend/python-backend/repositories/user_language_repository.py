from sqlalchemy.orm import Session
from models.user_language import UserLanguage
from .base_repository import BaseRepository

class UserLanguageRepository(BaseRepository[UserLanguage]):
    def __init__(self):
        super().__init__(UserLanguage)

    # Add user-language-specific queries here as needed 