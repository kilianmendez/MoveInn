from sqlalchemy.orm import Session
from models.reservation import Reservation
from .base_repository import BaseRepository

class ReservationRepository(BaseRepository[Reservation]):
    def __init__(self):
        super().__init__(Reservation)

    # Add reservation-specific queries here as needed 