from pydantic import BaseModel
from typing import Optional, List
from enums import ForumCategory

class ForumBase(BaseModel):
    title: str
    description: str
    country: str
    category: ForumCategory
    created_at: Optional[str] = None  # ISO date string
    created_by: str

class ForumCreate(ForumBase):
    pass

class ForumRead(ForumBase):
    id: str
    threads: Optional[List[str]] = None  # List of thread IDs

class ForumUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    country: Optional[str] = None
    category: Optional[ForumCategory] = None
    created_at: Optional[str] = None
    created_by: Optional[str] = None
    threads: Optional[List[str]] = None 