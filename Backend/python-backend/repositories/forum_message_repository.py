from sqlalchemy.orm import Session
from models.forum_message import ForumMessage
from .base_repository import BaseRepository
from fastapi import Depends
from database import get_db

class ForumMessageRepository(BaseRepository[ForumMessage]):
    def __init__(self):
        super().__init__(ForumMessage)

    # Add message-specific queries here as needed 

def get_forum_message_repository(db: Session = Depends(get_db)):
    return ForumMessageRepository() 