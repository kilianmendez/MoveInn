from sqlalchemy.orm import Session
from models.follow import Follow
from .base_repository import BaseRepository
from fastapi import Depends
from database import get_db

class FollowRepository(BaseRepository[Follow]):
    def __init__(self):
        super().__init__(Follow)

    # Add follow-specific queries here as needed 

def get_follow_repository(db: Session = Depends(get_db)):
    return FollowRepository() 