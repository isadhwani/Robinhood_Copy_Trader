from pydantic import BaseModel, validator
import base64

class Credentials(BaseModel):
    API_KEY: str
    BASE64_PRIVATE_KEY: str

    @validator('BASE64_PRIVATE_KEY')
    def validate_base64(cls, v):
        try:
            base64.b64decode(v)
        except Exception:
            raise ValueError('Invalid base64 string')
        return v

