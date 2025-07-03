from pydantic import BaseModel
from typing import Optional, List
from enums import Category, Rating

class RecommendationBase(BaseModel):
    title: str
    description: Optional[str] = None
    category: Optional[Category] = None
    address: str
    city: str
    country: str
    rating: Optional[Rating] = None
    created_at: Optional[str] = None  # ISO date string
    tags: Optional[List[str]] = None
    user_id: Optional[str] = None

class RecommendationCreate(RecommendationBase):
    pass

class RecommendationRead(RecommendationBase):
    id: str
    recommendation_images: Optional[List[str]] = None  # List of image URLs or IDs

class RecommendationUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    category: Optional[Category] = None
    address: Optional[str] = None
    city: Optional[str] = None
    country: Optional[str] = None
    rating: Optional[Rating] = None
    created_at: Optional[str] = None
    tags: Optional[List[str]] = None
    user_id: Optional[str] = None
    recommendation_images: Optional[List[str]] = None 