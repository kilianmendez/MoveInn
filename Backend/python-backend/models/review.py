from sqlalchemy import Column, String, DateTime, ForeignKey, Enum as SqlEnum
from sqlalchemy.orm import relationship
import uuid
from database import Base
# from .rating import Rating  # Enum to be defined elsewhere

class Review(Base):
    __tablename__ = "reviews"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    title = Column(String)
    content = Column(String)
    rating = Column(String)  # Replace with SqlEnum(Rating) when enum is defined
    created_at = Column(DateTime)
    reservation_id = Column(String(36), ForeignKey("reservations.id"))
    user_id = Column(String(36), ForeignKey("users.id"))

    # Relationships
    reservation = relationship("Reservation")
    user = relationship("User") 