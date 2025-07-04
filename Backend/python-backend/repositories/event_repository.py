from sqlalchemy.orm import Session
from models.event import Event
from .base_repository import BaseRepository

class EventRepository(BaseRepository[Event]):
    def __init__(self):
        super().__init__(Event)

    # Add event-specific queries here as needed 