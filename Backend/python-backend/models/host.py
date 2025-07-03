from sqlalchemy import Column, String, DateTime, ForeignKey, Enum as SqlEnum
from sqlalchemy.orm import relationship
import uuid
from database import Base
from models.speciality import host_specialties  # Import the association table
# from .request_status import RequestStatus  # Enum to be defined elsewhere

class Host(Base):
    __tablename__ = "hosts"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    reason = Column(String, nullable=False)
    created_at = Column(DateTime)
    status = Column(String, default="Pending")  # Replace with SqlEnum(RequestStatus) when enum is defined
    host_since = Column(DateTime)
    updated_at = Column(DateTime)

    # Relationships
    user = relationship("User", back_populates="host")
    specialties = relationship("Speciality", secondary=host_specialties, back_populates="hosts") 