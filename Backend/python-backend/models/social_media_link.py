from sqlalchemy import Column, String, Integer, ForeignKey, Enum as SqlEnum
from sqlalchemy.orm import relationship
from database import Base
# from .social_media import SocialMedia  # Enum to be defined elsewhere

class SocialMediaLink(Base):
    __tablename__ = "social_media_links"

    id = Column(Integer, primary_key=True, index=True)
    social_media = Column(String)  # Replace with SqlEnum(SocialMedia) when enum is defined
    url = Column(String)
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False)

    # Relationships
    user = relationship("User", back_populates="social_medias") 