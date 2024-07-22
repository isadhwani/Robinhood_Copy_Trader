import json

from fastapi import APIRouter, HTTPException, status, Response
from app.services.robinhood_service import RobinhoodService
from app.account.user import Users
from app.account.credentials import Credentials
from app.account.user import User

router = APIRouter()

# Map <userid> to <user>
users = Users()

provided_API_keys = False
print("running base code...")

@router.post("/add-credentials", status_code=200)
def add_credentials(credentials: Credentials, response: Response):
    try:

        robinhood_service = RobinhoodService(credentials.API_KEY, credentials.BASE64_PRIVATE_KEY)
        print("ADDED USER!!!")
        # robinhood_service = RobinhoodService(credentials.API_KEY, credentials.BASE64_PRIVATE_KEY)
    except Exception as e:
        response.status_code = status.HTTP_422_UNPROCESSABLE_ENTITY
        robinhood_service = None
        return HTTPException(
            #invalid format
            status_code=422, detail = f"Invalid base64 Private Key: {str(e)}"
        )
    holdings = robinhood_service.validate_account()
    if holdings:
        user_id = users.add_user(credentials, robinhood_service)
        return {"message": "API Keys are valid", "user_id": user_id, "holdings": holdings}
    else:
        robinhood_service = None
        print("1. is robinhood service none? " + str(robinhood_service == None))
        response.status_code = status.HTTP_401_UNAUTHORIZED
        return HTTPException (
            status_code=401, detail=f"Unable to find account with the provided keys."
        )


@router.get("/copy-profiles")
def fetch_portfolios():

    # Load data from JSON file
    with open('profiles/profiles.json', 'r') as f:
        data = json.load(f)
    return data

@router.get("/holdings")
def fetch_portfolios(user_id: int):
    print("user size: " + str(len(users.users)))

    user : User = users.get_user(0)
    return {"holdings" : user.robinhood_service.get_holdings(), "user_id": user_id}




@router.post("/")
def read_root():
    return {"Hello": "World"}
