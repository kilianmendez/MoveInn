from sqlalchemy.orm import Session
from models.forum_thread import ForumThread
from .base_repository import BaseRepository
from fastapi import Depends
from database import get_db

class ForumThreadRepository(BaseRepository[ForumThread]):
    def __init__(self):
        super().__init__(ForumThread)

    # Add thread-specific queries here as needed 

def get_forum_thread_repository(db: Session = Depends(get_db)):
    return ForumThreadRepository() 