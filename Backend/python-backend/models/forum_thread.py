from sqlalchemy import Column, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
import uuid
from database import Base

class ForumThread(Base):
    __tablename__ = "forum_threads"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    forum_id = Column(String(36), ForeignKey("forums.id"), nullable=False)
    title = Column(String, nullable=False)
    content = Column(String, nullable=False)
    created_at = Column(DateTime)
    created_by = Column(String(36))

    # Relationships
    forum = relationship("Forum", back_populates="threads")
    posts = relationship("ForumMessage", back_populates="thread") 