from sqlalchemy.orm import Session
from models.image import Image
from .base_repository import BaseRepository
from fastapi import Depends
from database import get_db

class ImageRepository(BaseRepository[Image]):
    def __init__(self):
        super().__init__(Image)

    # Add image-specific queries here as needed 

def get_image_repository(db: Session = Depends(get_db)):
    return ImageRepository() 