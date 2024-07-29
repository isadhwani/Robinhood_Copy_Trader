from pydantic import BaseModel


class ExecuteTradeRequest(BaseModel):
    user_id: int
    account_to_copy: int
    funds: float





