from sqlalchemy import Column, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
import uuid
from database import Base
from datetime import datetime

class ImageAccommodation(Base):
    __tablename__ = "image_accommodations"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    url = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    accommodation_id = Column(String(36), ForeignKey("accommodations.id"), nullable=False)

    accommodation = relationship("Accommodation", back_populates="accommodation_images") 