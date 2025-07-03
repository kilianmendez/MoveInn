from pydantic import BaseModel
from typing import Optional

class MessagesBase(BaseModel):
    sender_id: str
    receiver_id: Optional[str] = None
    content: str
    message_type: str = "text"
    sent_at: Optional[str] = None  # ISO date string
    status: str = "sent"

class MessagesCreate(MessagesBase):
    pass

class MessagesRead(MessagesBase):
    id: str

class MessagesUpdate(BaseModel):
    sender_id: Optional[str] = None
    receiver_id: Optional[str] = None
    content: Optional[str] = None
    message_type: Optional[str] = None
    sent_at: Optional[str] = None
    status: Optional[str] = None 