from sqlalchemy.orm import Session
from models.forum_message import ForumMessage
from .base_repository import BaseRepository

class ForumMessageRepository(BaseRepository[ForumMessage]):
    def __init__(self):
        super().__init__(ForumMessage)

    # Add message-specific queries here as needed 