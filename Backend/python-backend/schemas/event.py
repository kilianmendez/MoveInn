from pydantic import BaseModel, Field
from typing import Optional, List
from enums import EventCategory

class EventBase(BaseModel):
    title: str
    date: str  # ISO date string
    location: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    country: Optional[str] = None
    attendees_count: int = 0
    max_attendees: Optional[int] = None
    category: Optional[EventCategory] = None
    description: Optional[str] = None
    image_url: Optional[str] = None
    tags: Optional[List[str]] = None
    creator_id: str

class EventCreate(EventBase):
    pass

class EventRead(EventBase):
    id: str
    participants: Optional[List[str]] = None  # List of user IDs

class EventUpdate(BaseModel):
    title: Optional[str] = None
    date: Optional[str] = None
    location: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    country: Optional[str] = None
    attendees_count: Optional[int] = None
    max_attendees: Optional[int] = None
    category: Optional[EventCategory] = None
    description: Optional[str] = None
    image_url: Optional[str] = None
    tags: Optional[List[str]] = None
    creator_id: Optional[str] = None
    participants: Optional[List[str]] = None 