from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import httpx
import os
from dotenv import load_dotenv
from logic import get_outfit_advice, get_health_alerts, get_run_safety

load_dotenv()

app = FastAPI(title="VitalsAir API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

OWM_KEY = os.getenv("OWM_API_KEY")
WAQI_KEY = os.getenv("WAQI_API_KEY")


async def fetch_weather(city: str) -> dict:
    url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={OWM_KEY}&units=metric"
    async with httpx.AsyncClient() as client:
        r = await client.get(url)
        if r.status_code != 200:
            raise HTTPException(status_code=502, detail="Weather fetch failed")
        return r.json()


async def fetch_aqi(city: str) -> dict:
    url = f"https://api.waqi.info/feed/{city}/?token={WAQI_KEY}"
    async with httpx.AsyncClient() as client:
        r = await client.get(url)
        if r.status_code != 200:
            raise HTTPException(status_code=502, detail="AQI fetch failed")
        data = r.json()
        if data["status"] != "ok":
            raise HTTPException(status_code=502, detail="AQI city not found")
        iaqi = data["data"]["iaqi"]
        return {
            "aqi_us": data["data"]["aqi"],
            "pm25": iaqi.get("pm25", {}).get("v", 0),
            "pm10": iaqi.get("pm10", {}).get("v", 0),
            "o3": iaqi.get("o3", {}).get("v", 0),
        }


@app.get("/api/dashboard/{city}")
async def get_dashboard(city: str):
    weather_raw = await fetch_weather(city)
    aqi_raw = await fetch_aqi(city)

    weather = {
        "temp": weather_raw["main"]["temp"],
        "feels_like": weather_raw["main"]["feels_like"],
        "humidity": weather_raw["main"]["humidity"],
        "pressure": weather_raw["main"]["pressure"],
        "wind_speed": weather_raw["wind"]["speed"],
        "description": weather_raw["weather"][0]["description"],
        "uv_index": weather_raw.get("uvi", 0),
        "city": weather_raw["name"],
    }

    return {
        "weather": weather,
        "aqi": aqi_raw,
        "outfit": get_outfit_advice(weather),
        "health": get_health_alerts(weather, aqi_raw),
        "run_safety": get_run_safety(weather, aqi_raw),
    }


@app.get("/health")
def health_check():
    return {"status": "ok"}