import json
import uuid

from fastapi import APIRouter, HTTPException, status, Response
from app.services.robinhood_service import RobinhoodService
from app.services.coingecko_service import CoingeckoService

from app.account.user import Users
from app.account.credentials import Credentials
from app.account.user import User

from app.models.requests.execute_trade import ExecuteTradeRequest

router = APIRouter()

# Map <userid> to <user>
users = Users()

with open('profiles/profiles.json', 'r') as f:
    copy_portfolios = json.load(f)

provided_API_keys = False
print("running base code...")


@router.post("/add-credentials", status_code=200)
def add_credentials(credentials: Credentials, response: Response):
    try:
        robinhood_service = RobinhoodService(credentials.API_KEY, credentials.BASE64_PRIVATE_KEY)
        # robinhood_service = RobinhoodService(credentials.API_KEY, credentials.BASE64_PRIVATE_KEY)
    except Exception as e:
        response.status_code = status.HTTP_422_UNPROCESSABLE_ENTITY
        robinhood_service = None
        return HTTPException(
            #invalid format
            status_code=422, detail=f"Invalid base64 Private Key: {str(e)}"
        )
    holdings = robinhood_service.validate_account()
    if holdings:
        user_id = users.add_user(credentials, robinhood_service)
        return {"message": "API Keys are valid", "user_id": user_id, "holdings": holdings}
    else:
        robinhood_service = None
        print("1. is robinhood service none? " + str(robinhood_service == None))
        response.status_code = status.HTTP_401_UNAUTHORIZED
        return HTTPException(
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

    user: User = users.get_user(user_id)
    if user == None:
        return {"message": "User not found"}
    return {"holdings": user.robinhood_service.get_holdings(), "user_id": user_id}


@router.post("/execute-trade")
def execute_trade(execute_trade_request: ExecuteTradeRequest):
    print("received: " + str(execute_trade_request.user_id) + " " + str(
        execute_trade_request.account_to_copy) + " " + str(execute_trade_request.funds))

    for profile in copy_portfolios["portfolios"]:
        if profile['portfolio_id'] == execute_trade_request.account_to_copy:
            portfolio = profile['data']
    #
    # portfolio = filter(lambda portfolio: portfolio["portfolio_id"] == execute_trade_request.account_to_copy,
    #
    #                    copy_portfolios["portfolios"])
    # print("Trying to copy portofilo with holdings: " + str(portfolio['percentages']))

    # print(json.dumps(portfolio, indent=2))

    user: User = users.get_user(execute_trade_request.user_id)
    if user == None:
        return {"message": "User not found"}

    orders = []
    for coin in portfolio['percentages']:
        market_data_resp = user.robinhood_service.get_market_data(coin)
        # print(json.dumps(market_data_resp, indent=2))

        market_price = float(market_data_resp['results'][0]['price'])
        est_coin_value = float(portfolio['percentages'][coin] * execute_trade_request.funds)
        est_tokens = est_coin_value / market_price



        # print("coin: " + coin)
        # print("percentage: " + str(portfolio['percentages'][coin]))
        # print(f'est {coin} price ' + str(market_price))
        # print(f'est {coin} value: ' + str(est_coin_value))
        # print(f'est {coin} tokens: ' + str(est_tokens))

        rounded_est_tokens = round_down(est_tokens, 5 if coin == "BTC" else 4)
        rounded_est_price = rounded_est_tokens * market_price


        print(f"buying {rounded_est_tokens} {coin} at ${market_price} for {rounded_est_price}")

        order = user.robinhood_service.place_order(
            str(uuid.uuid4()),
            "buy",
            "market",
            f'{coin.upper()}-USD',
            {"asset_quantity": rounded_est_tokens}
        )
        orders.append(order)

        # print("Price: " + str(order['price']))

    return {"message": "Trade executed", "portfolio": portfolio, "orders": orders}

@router.get("/orders")
def orders():
    user: User = users.get_user(0)
    if user == None:
        return {"message": "User not found"}
    return {"orders": user.robinhood_service.get_orders()}


@router.post("/")
def read_root():
    return {"Hello": "World"}


def round_down(number, decimal_places):
    str_num=f"{number:.8f}"
    if '.' in str_num:
        integer_part, decimal_part = str_num.split('.')
        truncated_decimal = decimal_part[:decimal_places]
        return float(f"{integer_part}.{truncated_decimal}")
    else:
        return float(str_num)