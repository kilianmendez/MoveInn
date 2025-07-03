from pydantic import BaseModel
from typing import Optional, List

class ForumThreadBase(BaseModel):
    forum_id: str
    title: str
    content: str
    created_at: Optional[str] = None  # ISO date string
    created_by: str

class ForumThreadCreate(ForumThreadBase):
    pass

class ForumThreadRead(ForumThreadBase):
    id: str
    posts: Optional[List[str]] = None  # List of message IDs

class ForumThreadUpdate(BaseModel):
    forum_id: Optional[str] = None
    title: Optional[str] = None
    content: Optional[str] = None
    created_at: Optional[str] = None
    created_by: Optional[str] = None
    posts: Optional[List[str]] = None 