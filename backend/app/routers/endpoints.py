from fastapi import APIRouter, HTTPException, status, Response
from pydantic import BaseModel, validator
import base64

from app.services.robinhood_service import RobinhoodService

router = APIRouter()

provided_API_keys = False


#API_KEY = ""
#BASE64_PRIVATE_KEY = ""



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


@router.post("/add-credentials", status_code=200)
def add_credentials(credentials: Credentials,response: Response):
    try:
        robinhood_service = RobinhoodService(credentials.API_KEY, credentials.BASE64_PRIVATE_KEY)
    except Exception as e:
        response.status_code = status.HTTP_422_UNPROCESSABLE_ENTITY
        return HTTPException(
            #invalid format
            status_code=422, detail = f"Invalid base64 Private Key: {str(e)}"
        )
    holdings = robinhood_service.validate_account()
    if holdings:
        return {"message": "API Keys are valid", "crypto_holdings": holdings}
    else:
        response.status_code = status.HTTP_401_UNAUTHORIZED
        return HTTPException (
            status_code=401, detail=f"Unable to find account with the provided keys."
        )

    


@router.post("/")
def read_root():
    return {"Hello": "World"}
