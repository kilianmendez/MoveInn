from sqlalchemy.orm import Session
from models.host import Host
from .base_repository import BaseRepository

class HostRepository(BaseRepository[Host]):
    def __init__(self):
        super().__init__(Host)

    # Add host-specific queries here as needed 