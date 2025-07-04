from sqlalchemy.orm import Session
from models.forum import Forum
from .base_repository import BaseRepository

class ForumRepository(BaseRepository[Forum]):
    def __init__(self):
        super().__init__(Forum)

    # Add forum-specific queries here as needed 