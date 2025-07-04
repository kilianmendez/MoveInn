from sqlalchemy.orm import Session
from models.user import User
from .base_repository import BaseRepository
from fastapi import Depends
from database import get_db

class UserRepository(BaseRepository[User]):
    def __init__(self):
        super().__init__(User)

    # Add user-specific queries here as needed 

def get_user_repository(db: Session = Depends(get_db)):
    return UserRepository() 