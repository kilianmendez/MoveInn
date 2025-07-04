from sqlalchemy.orm import Session
from models.image import Image
from .base_repository import BaseRepository

class ImageRepository(BaseRepository[Image]):
    def __init__(self):
        super().__init__(Image)

    # Add image-specific queries here as needed 