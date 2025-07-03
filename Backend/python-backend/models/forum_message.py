from sqlalchemy import Column, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
import uuid
from database import Base

class ForumMessage(Base):
    __tablename__ = "forum_messages"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    thread_id = Column(String(36), ForeignKey("forum_threads.id"), nullable=False)
    content = Column(String, nullable=False)
    created_at = Column(DateTime)
    created_by = Column(String(36))
    parent_message_id = Column(String(36), ForeignKey("forum_messages.id"))

    # Relationships
    thread = relationship("ForumThread", back_populates="posts")
    parent_message = relationship("ForumMessage", remote_side=[id], back_populates="replies")
    replies = relationship("ForumMessage", back_populates="parent_message", remote_side=[parent_message_id]) 