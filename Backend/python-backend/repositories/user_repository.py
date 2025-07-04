from sqlalchemy.orm import Session
from models.user import User
from .base_repository import BaseRepository

class UserRepository(BaseRepository[User]):
    def __init__(self):
        super().__init__(User)

    # Add user-specific queries here as needed 