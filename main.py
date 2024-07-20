from fastapi import FastAPI
from http_client import *
from fastapi.middleware.cors import CORSMiddleware
from database import create_tables, delete_tables
from db_worker import *
from contextlib import asynccontextmanager

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

@asynccontextmanager
async def lifespan(app):        
    #await delete_tables()
    await create_tables()
    yield

client = HTTPClient("e10fa1f759734f5aad4181537241807")

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware, 
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/fetch_forecast")
async def fetch_forecast(city: str):
    data = await fetch_data(city)
    if data != None and data.city == city:
        await increment_count(city)
    else:
        await post_data(city)
    return await client.fetch_forecast(city)

@app.get("/fetch_count")
async def fetch_count(city: str):
    return await fetch_data(city)

@app.get("/search_city")
async def search_city(desired: str):
    return await client.search_city(desired)