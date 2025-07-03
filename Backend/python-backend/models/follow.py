from sqlalchemy import Column, DateTime, ForeignKey, String
from sqlalchemy.orm import relationship
import uuid
from database import Base

class Follow(Base):
    __tablename__ = "follows"

    follow_id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    follower_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    following_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    created_at = Column(DateTime)

    # Relationships
    follower = relationship("User", foreign_keys=[follower_id], back_populates="followings")
    following = relationship("User", foreign_keys=[following_id], back_populates="followers") 