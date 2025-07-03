from pydantic import BaseModel
from typing import Optional

class ImageBase(BaseModel):
    url: str
    created_at: Optional[str] = None  # ISO date string
    user_id: Optional[str] = None
    recommendation_id: Optional[str] = None

class ImageCreate(ImageBase):
    pass

class ImageRead(ImageBase):
    id: str

class ImageUpdate(BaseModel):
    url: Optional[str] = None
    created_at: Optional[str] = None
    user_id: Optional[str] = None
    recommendation_id: Optional[str] = None 