from sqlalchemy import Column, DateTime, Numeric, ForeignKey, String, Enum as SqlEnum
from sqlalchemy.orm import relationship
import uuid
from database import Base
# from .reservation_status import ReservationStatus  # Enum to be defined elsewhere

class Reservation(Base):
    __tablename__ = "reservations"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    start_date = Column(DateTime, nullable=False)
    end_date = Column(DateTime, nullable=False)
    total_price = Column(Numeric)
    status = Column(String, default="Pending")  # Replace with SqlEnum(ReservationStatus) when enum is defined
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    accommodation_id = Column(String(36), ForeignKey("accommodations.id"), nullable=False)

    # Relationships
    user = relationship("User")
    accommodation = relationship("Accommodation") 