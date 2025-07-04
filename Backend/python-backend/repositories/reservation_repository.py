from sqlalchemy.orm import Session
from models.reservation import Reservation
from .base_repository import BaseRepository
from fastapi import Depends
from database import get_db

class ReservationRepository(BaseRepository[Reservation]):
    def __init__(self):
        super().__init__(Reservation)

    # Add reservation-specific queries here as needed 

def get_reservation_repository(db: Session = Depends(get_db)):
    return ReservationRepository() 