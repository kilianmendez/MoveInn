from sqlalchemy import Column, String, Integer, Boolean, DateTime, ForeignKey, Numeric, Enum as SqlEnum
from sqlalchemy.orm import relationship
import uuid
from database import Base
# from .accommodation_type import AccommodationType  # Enum to be defined elsewhere

class Accommodation(Base):
    __tablename__ = "accommodations"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    title = Column(String, nullable=False)
    description = Column(String)
    address = Column(String, nullable=False)
    city = Column(String)
    country = Column(String)
    price_per_month = Column(Numeric)
    number_of_rooms = Column(Integer)
    bathrooms = Column(Integer)
    square_meters = Column(Integer)
    has_wifi = Column(Boolean)
    available_from = Column(DateTime)
    available_to = Column(DateTime)
    owner_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    accommodation_type = Column(String)  # Replace with SqlEnum(AccommodationType) when enum is defined

    # Relationships
    owner = relationship("User", back_populates="accommodations")
    accommodation_images = relationship("ImageAccommodation", back_populates="accommodation") 