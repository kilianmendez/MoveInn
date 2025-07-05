from fastapi import APIRouter, Depends, HTTPException, status
from schemas.user import UserCreate, UserLogin, UserResponse
from services.user_service import UserService
from repositories.user_repository import UserRepository
from auth.dependencies import get_current_user
from sqlalchemy.orm import Session
from database import get_db
from auth.password_utils import verify_password
from auth.jwt_utils import create_access_token

router = APIRouter(prefix="/auth", tags=["auth"])

# TODO: Implement authentication endpoints (login, register, /me, etc.) 

# Endpoints will be implemented in later subtasks 

@router.post("/login")
def login(user_login: UserLogin, db: Session = Depends(get_db)):
    user_service = UserService(UserRepository())
    user = user_service.get_user_by_mail(db, user_login.mail)
    if not user or not verify_password(user_login.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token({"sub": user.id, "role": str(user.role)})
    # Build response using UserResponse schema
    user_response = UserResponse(
        id=user.id,
        name=user.name,
        last_name=user.last_name,
        mail=user.mail,
        biography=user.biography,
        avatar_url=user.avatar_url,
        school=user.school,
        degree=user.degree,
        nationality=user.nationality,
        city=user.city,
        erasmus_country=user.erasmus_country,
        erasmus_date=user.erasmus_date,
        phone=user.phone,
        role=user.role,
        languages=getattr(user, "languages", None)
    )
    return {"user": user_response, "access_token": access_token, "token_type": "bearer"}

@router.get("/me", response_model=UserResponse)
def get_me(current_user=Depends(get_current_user)):
    if current_user is None:
        raise HTTPException(status_code=401, detail="Not authenticated")
    data = {field: getattr(current_user, field) for field in UserResponse.model_fields}
    return UserResponse.model_validate(data) 