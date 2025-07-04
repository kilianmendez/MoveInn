from sqlalchemy.orm import Session
from models.event import Event
from .base_repository import BaseRepository
from fastapi import Depends
from database import get_db

class EventRepository(BaseRepository[Event]):
    def __init__(self):
        super().__init__(Event)

    # Add event-specific queries here as needed 

def get_event_repository(db: Session = Depends(get_db)):
    return EventRepository() 