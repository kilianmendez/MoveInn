from pydantic import BaseModel
from typing import Optional

class FollowBase(BaseModel):
    follower_id: str
    following_id: str
    created_at: Optional[str] = None  # ISO date string

class FollowCreate(FollowBase):
    pass

class FollowRead(FollowBase):
    follow_id: str

class FollowUpdate(BaseModel):
    follower_id: Optional[str] = None
    following_id: Optional[str] = None
    created_at: Optional[str] = None 