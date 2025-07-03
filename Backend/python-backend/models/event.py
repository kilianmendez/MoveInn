from sqlalchemy import Column, String, Integer, DateTime, ForeignKey, Table
from sqlalchemy.orm import relationship
import uuid
from database import Base

# Association table for many-to-many relationship between events and users (participants)
event_participants = Table(
    'event_participants', Base.metadata,
    Column('event_id', String(36), ForeignKey('events.id'), primary_key=True),
    Column('user_id', String(36), ForeignKey('users.id'), primary_key=True)
)

class Event(Base):
    __tablename__ = "events"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    title = Column(String, nullable=False)
    date = Column(DateTime)
    location = Column(String)
    address = Column(String)
    city = Column(String)
    country = Column(String)
    attendees_count = Column(Integer, default=0)
    max_attendees = Column(Integer)
    category = Column(String)
    description = Column(String)
    image_url = Column(String)
    tags = Column(String)  # Store as comma-separated string for SQLite compatibility
    creator_id = Column(String(36), ForeignKey("users.id"), nullable=False)

    # Relationships
    creator = relationship("User", back_populates="created_events", foreign_keys=[creator_id])
    participants = relationship("User", secondary=event_participants, back_populates="participating_events") 