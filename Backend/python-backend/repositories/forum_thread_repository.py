from sqlalchemy.orm import Session
from models.forum_thread import ForumThread
from .base_repository import BaseRepository

class ForumThreadRepository(BaseRepository[ForumThread]):
    def __init__(self):
        super().__init__(ForumThread)

    # Add thread-specific queries here as needed 