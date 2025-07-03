from pydantic import BaseModel, Field
from typing import Optional, List
from enums import AcommodationType

class AccommodationBase(BaseModel):
    title: str
    description: Optional[str] = None
    address: str
    city: Optional[str] = None
    country: Optional[str] = None
    price_per_month: float
    number_of_rooms: int
    bathrooms: int
    square_meters: int
    has_wifi: bool
    available_from: str  # ISO date string
    available_to: str    # ISO date string
    acommodation_type: AcommodationType

class AccommodationCreate(AccommodationBase):
    owner_id: str

class AccommodationRead(AccommodationBase):
    id: str
    owner_id: str
    acommodation_type: AcommodationType
    accomodation_images: Optional[List[str]] = None  # List of image URLs or IDs

class AccommodationUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    country: Optional[str] = None
    price_per_month: Optional[float] = None
    number_of_rooms: Optional[int] = None
    bathrooms: Optional[int] = None
    square_meters: Optional[int] = None
    has_wifi: Optional[bool] = None
    available_from: Optional[str] = None
    available_to: Optional[str] = None
    acommodation_type: Optional[AcommodationType] = None 