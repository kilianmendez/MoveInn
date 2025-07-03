from sqlalchemy import Column, String, DateTime, ForeignKey, Enum as SqlEnum
from sqlalchemy.orm import relationship
import uuid
from database import Base
# from .forum_category import ForumCategory  # Enum to be defined elsewhere

class Forum(Base):
    __tablename__ = "forums"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    country = Column(String, nullable=False)
    category = Column(String)  # Replace with SqlEnum(ForumCategory) when enum is defined
    created_at = Column(DateTime)
    created_by = Column(String(36))

    # Relationships
    threads = relationship("ForumThread", back_populates="forum") 