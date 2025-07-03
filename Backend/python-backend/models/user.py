from sqlalchemy import Column, String, DateTime, Boolean, ForeignKey, Enum as SqlEnum
from sqlalchemy.orm import relationship
import uuid
from database import Base
# from .role import Role  # Enum to be defined elsewhere

class User(Base):
    __tablename__ = "users"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    name = Column(String, nullable=False)
    last_name = Column(String)
    mail = Column(String, unique=True, nullable=False, index=True)
    password = Column(String, nullable=False)
    role = Column(String, default="User")  # Replace with SqlEnum(Role) when Role enum is defined
    biography = Column(String)
    avatar_url = Column(String)
    school = Column(String)
    degree = Column(String)
    nationality = Column(String)
    city = Column(String)
    erasmus_country = Column(String)
    erasmus_date = Column(DateTime)
    phone = Column(String, nullable=False)

    # Relationships
    accommodations = relationship("Accommodation", back_populates="owner")
    social_medias = relationship("SocialMediaLink", back_populates="user")
    recommendations = relationship("Recommendation", back_populates="user")
    created_events = relationship("Event", back_populates="creator", foreign_keys='Event.creator_id')
    participating_events = relationship("Event", secondary="event_participants", back_populates="participants")
    host = relationship("Host", uselist=False, back_populates="user")
    languages = relationship("UserLanguage", back_populates="user")
    followings = relationship("Follow", back_populates="follower", foreign_keys='Follow.follower_id')
    followers = relationship("Follow", back_populates="following", foreign_keys='Follow.following_id') 