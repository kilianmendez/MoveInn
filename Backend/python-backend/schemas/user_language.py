from pydantic import BaseModel
from typing import Optional
from enums import LanguageLevel

class UserLanguageBase(BaseModel):
    language: str
    level: LanguageLevel
    user_id: str

class UserLanguageCreate(UserLanguageBase):
    pass

class UserLanguageRead(UserLanguageBase):
    id: str

class UserLanguageUpdate(BaseModel):
    language: Optional[str] = None
    level: Optional[LanguageLevel] = None
    user_id: Optional[str] = None 