from sqlalchemy import Column, String, ForeignKey, Enum as SqlEnum
from sqlalchemy.orm import relationship
import uuid
from database import Base
# from .language_level import LanguageLevel  # Enum to be defined elsewhere

class UserLanguage(Base):
    __tablename__ = "user_languages"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    language = Column(String, nullable=False)
    level = Column(String)  # Replace with SqlEnum(LanguageLevel) when enum is defined
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False)

    # Relationships
    user = relationship("User", back_populates="languages") 