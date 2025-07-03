from sqlalchemy import Column, String, DateTime, ForeignKey, Enum as SqlEnum, Numeric
from sqlalchemy.orm import relationship
import uuid
from database import Base
# from .category import Category  # Enum to be defined elsewhere
# from .rating import Rating  # Enum to be defined elsewhere

class Recommendation(Base):
    __tablename__ = "recommendations"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    title = Column(String, nullable=False)
    description = Column(String)
    category = Column(String)  # Replace with SqlEnum(Category) when enum is defined
    address = Column(String)
    city = Column(String)
    country = Column(String)
    rating = Column(String)  # Replace with SqlEnum(Rating) when enum is defined
    created_at = Column(DateTime)
    tags = Column(String)  # Store as comma-separated string for SQLite compatibility
    user_id = Column(String(36), ForeignKey("users.id"))

    # Relationships
    user = relationship("User", back_populates="recommendations")
    recommendation_images = relationship("Image", back_populates="recommendation") 