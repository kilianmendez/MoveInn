from sqlalchemy.orm import Session
from models.forum import Forum
from .base_repository import BaseRepository
from fastapi import Depends
from database import get_db

class ForumRepository(BaseRepository[Forum]):
    def __init__(self):
        super().__init__(Forum)

    # Add forum-specific queries here as needed 

def get_forum_repository(db: Session = Depends(get_db)):
    return ForumRepository() 