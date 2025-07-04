from sqlalchemy.orm import Session
from models.social_media_link import SocialMediaLink
from .base_repository import BaseRepository

class SocialMediaLinkRepository(BaseRepository[SocialMediaLink]):
    def __init__(self):
        super().__init__(SocialMediaLink)

    # Add social-media-link-specific queries here as needed 