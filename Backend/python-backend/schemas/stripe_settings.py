from pydantic import BaseModel

class StripeSettings(BaseModel):
    secret_key: str
    publishable_key: str 