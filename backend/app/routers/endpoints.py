from fastapi import APIRouter, HTTPException

from app.services.robinhood_service import RobinhoodService

router = APIRouter()

provided_API_keys = False


API_KEY = ""
BASE64_PRIVATE_KEY = ""

@router.post("/add-credentials")
def read_root(API_KEY: str, BASE64_PRIVATE_KEY: str):
    robinhood_service = RobinhoodService(API_KEY, BASE64_PRIVATE_KEY)
    try:
        holdings = robinhood_service.validate_account()
        provided_API_keys = True
        return {"message": "API Keys are valid", "crypto_holdings": holdings}
    except Exception as e:
        robinhood_service = None
        return HTTPException(
            status_code=401, detail="Invalid API Keys"
        )





@router.post("/")
def read_root():
    return {"Hello": "World"}
