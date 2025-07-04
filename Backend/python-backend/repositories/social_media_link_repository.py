from sqlalchemy.orm import Session
from models.social_media_link import SocialMediaLink
from .base_repository import BaseRepository
from fastapi import Depends
from database import get_db

class SocialMediaLinkRepository(BaseRepository[SocialMediaLink]):
    def __init__(self):
        super().__init__(SocialMediaLink)

    # Add social-media-link-specific queries here as needed 

def get_social_media_link_repository(db: Session = Depends(get_db)):
    return SocialMediaLinkRepository() 