from pydantic import BaseModel
from typing import Optional, List

class ForumMessageBase(BaseModel):
    thread_id: str
    content: str
    created_at: Optional[str] = None  # ISO date string
    created_by: str
    parent_message_id: Optional[str] = None

class ForumMessageCreate(ForumMessageBase):
    pass

class ForumMessageRead(ForumMessageBase):
    id: str
    replies: Optional[List[str]] = None  # List of reply message IDs

class ForumMessageUpdate(BaseModel):
    thread_id: Optional[str] = None
    content: Optional[str] = None
    created_at: Optional[str] = None
    created_by: Optional[str] = None
    parent_message_id: Optional[str] = None
    replies: Optional[List[str]] = None 