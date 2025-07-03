from pydantic import BaseModel
from typing import Optional
from enums import Rating

class ReviewBase(BaseModel):
    title: str
    content: str
    rating: Rating
    created_at: Optional[str] = None  # ISO date string
    reservation_id: str
    user_id: str

class ReviewCreate(ReviewBase):
    pass

class ReviewRead(ReviewBase):
    id: str
    created_at: Optional[str] = None

class ReviewUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    rating: Optional[Rating] = None
    created_at: Optional[str] = None
    reservation_id: Optional[str] = None
    user_id: Optional[str] = None 