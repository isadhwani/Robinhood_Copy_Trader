from fastapi import APIRouter, HTTPException

from app.services.robinhood_service import RobinhoodService
import json

router = APIRouter()

provided_API_keys = False


API_KEY = ""
BASE64_PRIVATE_KEY = ""

@router.post("/add-credentials")
def add_credentials(API_KEY: str, BASE64_PRIVATE_KEY: str):
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


@router.get("/portfolios")
def fetch_portfolios():
    # Load data from JSON file
    with open('profiles/profiles.json', 'r') as f:
        data = json.load(f)
    return data





@router.post("/")
def read_root():
    return {"Hello": "World"}
