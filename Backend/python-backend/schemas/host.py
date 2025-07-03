from pydantic import BaseModel
from typing import Optional, List
from enums import RequestStatus

class HostBase(BaseModel):
    user_id: str
    reason: str
    status: RequestStatus = RequestStatus.Pending
    host_since: Optional[str] = None  # ISO date string
    created_at: Optional[str] = None
    updated_at: Optional[str] = None
    specialties: Optional[List[str]] = None  # List of specialty IDs or names

class HostCreate(HostBase):
    pass

class HostRead(HostBase):
    id: str

class HostUpdate(BaseModel):
    user_id: Optional[str] = None
    reason: Optional[str] = None
    status: Optional[RequestStatus] = None
    host_since: Optional[str] = None
    created_at: Optional[str] = None
    updated_at: Optional[str] = None
    specialties: Optional[List[str]] = None 