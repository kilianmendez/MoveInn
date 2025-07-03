from pydantic import BaseModel
from typing import Optional, List

class SpecialityBase(BaseModel):
    name: str
    hosts: Optional[List[str]] = None  # List of host IDs

class SpecialityCreate(SpecialityBase):
    pass

class SpecialityRead(SpecialityBase):
    id: str

class SpecialityUpdate(BaseModel):
    name: Optional[str] = None
    hosts: Optional[List[str]] = None 