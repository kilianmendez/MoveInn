from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from enums import Role, LanguageLevel

class UserBase(BaseModel):
    name: str
    last_name: Optional[str] = None
    mail: EmailStr
    biography: Optional[str] = None
    avatar_url: Optional[str] = None
    school: Optional[str] = None
    degree: Optional[str] = None
    nationality: Optional[str] = None
    city: Optional[str] = None
    erasmus_country: Optional[str] = None
    erasmus_date: Optional[str] = None  # ISO date string
    phone: str
    role: Role = Role.User
    languages: Optional[List[LanguageLevel]] = None

class UserCreate(UserBase):
    password: str

class UserRead(UserBase):
    id: str
    role: Role
    languages: Optional[List[LanguageLevel]] = None

class UserUpdate(BaseModel):
    name: Optional[str] = None
    last_name: Optional[str] = None
    mail: Optional[EmailStr] = None
    biography: Optional[str] = None
    avatar_url: Optional[str] = None
    school: Optional[str] = None
    degree: Optional[str] = None
    nationality: Optional[str] = None
    city: Optional[str] = None
    erasmus_country: Optional[str] = None
    erasmus_date: Optional[str] = None
    phone: Optional[str] = None
    password: Optional[str] = None
    role: Optional[Role] = None
    languages: Optional[List[LanguageLevel]] = None 