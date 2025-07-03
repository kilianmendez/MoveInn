from sqlalchemy import Column, String, ForeignKey, Table
from sqlalchemy.orm import relationship
import uuid
from database import Base

# Association table for many-to-many relationship between hosts and specialties
host_specialties = Table(
    'host_specialties', Base.metadata,
    Column('host_id', String(36), ForeignKey('hosts.id'), primary_key=True),
    Column('speciality_id', String(36), ForeignKey('specialities.id'), primary_key=True)
)

class Speciality(Base):
    __tablename__ = "specialities"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    name = Column(String, nullable=False)

    # Relationships
    hosts = relationship("Host", secondary=host_specialties, back_populates="specialties") 