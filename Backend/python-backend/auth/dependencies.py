from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
import jwt
from repositories.user_repository import UserRepository
from auth.jwt_utils import decode_access_token
from models.user import User
from typing import List, Callable
from sqlalchemy.orm import Session
from database import get_db

# OAuth2 scheme for extracting the token
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/token")

user_repository = UserRepository()


def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> User:
    """
    FastAPI dependency to get the current user from the JWT token.
    Raises HTTPException if token is invalid or user not found.
    """
    try:
        payload = decode_access_token(token)
        user_id = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    except (jwt.ExpiredSignatureError, jwt.InvalidTokenError):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    user = user_repository.get_by_id(db, user_id)
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")
    return user


def require_role(roles: List[str]) -> Callable:
    """
    Returns a FastAPI dependency that checks if the current user has one of the required roles.
    Raises HTTPException if not authorized.
    Usage: Depends(require_role(["admin", "moderator"]))
    """
    def dependency(current_user: User = Depends(get_current_user)):
        if current_user.role not in roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You do not have permission to perform this action."
            )
        return current_user
    return dependency 