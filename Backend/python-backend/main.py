from fastapi import FastAPI
import models

from config import get_settings

from fastapi import Depends
from repositories.user_repository import get_user_repository, UserRepository
from database import get_db
from sqlalchemy.orm import Session

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