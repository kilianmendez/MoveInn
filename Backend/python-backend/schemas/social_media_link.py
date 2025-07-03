from pydantic import BaseModel
from typing import Optional
from enums import SocialMedia

class SocialMediaLinkBase(BaseModel):
    social_media: SocialMedia
    url: str
    user_id: str

class SocialMediaLinkCreate(SocialMediaLinkBase):
    pass

class SocialMediaLinkRead(SocialMediaLinkBase):
    id: int

class SocialMediaLinkUpdate(BaseModel):
    social_media: Optional[SocialMedia] = None
    url: Optional[str] = None
    user_id: Optional[str] = None 