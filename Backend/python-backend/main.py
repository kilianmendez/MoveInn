from fastapi import FastAPI, Depends, HTTPException, status
import models
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from config import get_settings

from repositories.user_repository import get_user_repository, UserRepository
from database import get_db
from auth.dependencies import get_current_user, require_role
from models.user import User
from services.user_service import UserService
from auth.password_utils import verify_password
from auth.jwt_utils import create_access_token

settings = get_settings()

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/config")
def read_config():
    return {"jwt key": settings.jwt_secret_key}

@app.get("/test-users")
def test_users(user_repo: UserRepository = Depends(get_user_repository), db: Session = Depends(get_db)):
    # This will return all users in the database (empty list if none)
    return user_repo.get_all(db)

@app.get("/me")
def read_current_user(current_user: User = Depends(get_current_user)):
    return {"user_id": current_user.id, "email": current_user.mail, "role": current_user.role}

@app.get("/admin-only")
def admin_endpoint(current_user: User = Depends(require_role(["admin"]))):
    return {"message": f"Welcome, admin {current_user.mail}!"}

@app.post("/token")
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user_service = UserService(UserRepository())
    user = user_service.get_user_by_mail(db, form_data.username)
    if not user or not verify_password(form_data.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token({"sub": user.id, "role": user.role})
    return {"access_token": access_token, "token_type": "bearer"}