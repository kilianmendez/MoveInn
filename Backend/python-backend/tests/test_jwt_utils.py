import pytest
from auth.jwt_utils import create_access_token, decode_access_token
from datetime import timedelta
import jwt
from config import JWT_SECRET_KEY

def test_create_and_decode_access_token():
    data = {"sub": "user_id", "role": "admin"}
    token = create_access_token(data, expires_delta=timedelta(minutes=1))
    decoded = decode_access_token(token)
    assert decoded["sub"] == "user_id"
    assert decoded["role"] == "admin"

    # Tamper with the token
    parts = token.split('.')
    tampered_token = parts[0] + '.' + parts[1] + '.invalidsignature'
    with pytest.raises(jwt.InvalidTokenError):
        decode_access_token(tampered_token) 