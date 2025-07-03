from sqlalchemy import Column, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
import uuid
from database import Base

class Image(Base):
    __tablename__ = "images"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    url = Column(String, nullable=False)
    created_at = Column(DateTime)
    user_id = Column(String(36), ForeignKey("users.id"))
    recommendation_id = Column(String(36), ForeignKey("recommendations.id"))

    # Relationships
    user = relationship("User")
    recommendation = relationship("Recommendation", back_populates="recommendation_images") 