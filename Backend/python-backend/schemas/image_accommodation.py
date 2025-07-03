from pydantic import BaseModel
from typing import Optional

class ImageAccommodationBase(BaseModel):
    url: str
    created_at: Optional[str] = None  # ISO date string
    accommodation_id: str

class ImageAccommodationCreate(ImageAccommodationBase):
    pass

class ImageAccommodationRead(ImageAccommodationBase):
    id: str

class ImageAccommodationUpdate(BaseModel):
    url: Optional[str] = None
    created_at: Optional[str] = None
    accommodation_id: Optional[str] = None 