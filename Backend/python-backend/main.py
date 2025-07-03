from fastapi import FastAPI

from config import get_settings

settings = get_settings()

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/config")
def read_config():
    return {"jwt key": settings.jwt_secret_key}
