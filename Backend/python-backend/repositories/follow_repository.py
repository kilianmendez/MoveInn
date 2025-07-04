from sqlalchemy.orm import Session
from models.follow import Follow
from .base_repository import BaseRepository

class FollowRepository(BaseRepository[Follow]):
    def __init__(self):
        super().__init__(Follow)

    # Add follow-specific queries here as needed 