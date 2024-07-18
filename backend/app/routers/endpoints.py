from fastapi import APIRouter

router = APIRouter()

provided_API_keys = False

API_KEY = ""
BASE64_PRIVATE_KEY = ""

@router.post("/add-credentials")
def read_root(API_KEY: str, BASE64_PRIVATE_KEY: str):
    provided_API_keys = True


    return {"Hello": "World"}


@router.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}

@router.post("/add-credentials")
def read_root(API_KEY: str, BASE64_PRIVATE_KEY: str):
    provided_API_keys = True

    return {"Hello": "World"}
