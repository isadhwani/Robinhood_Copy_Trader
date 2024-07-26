import uvicorn
from typing import Union
from fastapi import FastAPI
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from starlette.middleware.cors import CORSMiddleware


# from routers.endpoints import router
from app.routers import endpoints

app = FastAPI()



print("Running main.py")
app = FastAPI()
app.include_router(endpoints.router)

app.add_middleware(TrustedHostMiddleware, allowed_hosts=["localhost", "127.0.0.1"])
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8000", "https://localhost:8000", "http://127.0.0.1:8000", "https://127.0.0.1:8000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.middleware("http")
async def add_security_headers(request, call_next):
    response = await call_next(request)
    response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    return response

@app.get("/")
async def root():
    return {"message": "Meow"}

if __name__ == "__main__":
    print("Starting server with HTTPS...")
    uvicorn.run(
        "app.main:app",
        host="127.0.0.1",
        port=8000,
        ssl_keyfile="key.pem",
        ssl_certfile="cert.pem",
        reload = True
    )





