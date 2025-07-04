from sqlalchemy.orm import Session
from models.host import Host
from .base_repository import BaseRepository
from fastapi import Depends
from database import get_db

class HostRepository(BaseRepository[Host]):
    def __init__(self):
        super().__init__(Host)

    # Add host-specific queries here as needed 

def get_host_repository(db: Session = Depends(get_db)):
    return HostRepository() 