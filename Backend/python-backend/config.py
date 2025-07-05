from pydantic_settings import BaseSettings, SettingsConfigDict
from functools import lru_cache

class Settings(BaseSettings):
    database_url: str
    jwt_secret_key: str
    stripe_secret_key: str
    stripe_publishable_key: str

    model_config = SettingsConfigDict(
        env_file='.env',
        env_file_encoding='utf-8'
    )

# JWT secret key for signing tokens (use a secure random value in production)
JWT_SECRET_KEY = "dev_secret_key_1234567890"

@lru_cache
def get_settings():
    return Settings()