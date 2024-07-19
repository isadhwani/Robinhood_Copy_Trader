from typing import Union

from fastapi import FastAPI

# from routers.endpoints import router
from app.routers import endpoints

print("Running main.py")
app = FastAPI()
app.include_router(endpoints.router)

@app.get("/")
async def root():
    return {"message": "Meow"}


# app.include_router(router)






