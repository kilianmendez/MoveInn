from pydantic import BaseModel
from typing import Optional
from enums import ReservationStatus

class ReservationBase(BaseModel):
    start_date: str  # ISO date string
    end_date: str    # ISO date string
    total_price: float
    status: ReservationStatus = ReservationStatus.Pending
    user_id: str
    accommodation_id: str

class ReservationCreate(ReservationBase):
    pass

class ReservationRead(ReservationBase):
    id: str
    status: ReservationStatus

class ReservationUpdate(BaseModel):
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    total_price: Optional[float] = None
    status: Optional[ReservationStatus] = None
    user_id: Optional[str] = None
    accommodation_id: Optional[str] = None 