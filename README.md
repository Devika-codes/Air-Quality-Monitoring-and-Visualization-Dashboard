# VitalsAir

A Python-based Environmental & Lifestyle Intelligence dashboard. Correlates real-time weather and air quality data with actionable health and lifestyle advice.

---

## Project Structure

```
vitalsair/
├── backend/
│   ├── main.py           ← FastAPI server & endpoints
│   ├── logic.py          ← Impact Engine (outfit, health, run safety)
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── App.jsx
    │   ├── index.css
    │   └── components/
    │       ├── Dashboard.jsx
    │       ├── SearchBar.jsx
    │       ├── InsightCard.jsx   ← Run safety hero card
    │       ├── AQICard.jsx
    │       ├── HealthCard.jsx
    │       └── OutfitCard.jsx
    ├── package.json
    └── vite.config.js
```

---

## API Keys Required

| Service | Used For | Get Key |
|---|---|---|
| OpenWeatherMap | Weather data | openweathermap.org/api |
| WAQI | AQI / PM2.5 / PM10 / O3 | waqi.info/api |

---

## Backend Setup

```bash
cd backend

# Create and activate virtual environment
python -m venv .venv
.venv\Scripts\activate        # Windows
source .venv/bin/activate     # Mac/Linux

# Install dependencies
pip install -r requirements.txt

# Set API keys (create a .env file in backend/)
OWM_API_KEY=your_openweathermap_key
WAQI_API_KEY=your_waqi_key

# Run the server
uvicorn main:app --reload --port 8000
```

API will be live at: http://localhost:8000
Docs at: http://localhost:8000/docs

---

## Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```

Frontend will be live at: http://localhost:5173

---

## API Endpoints

```
GET /api/dashboard/{city}
GET /health
```
**GET /api/dashboard/{city}** returns:
- `weather`    — Temp, feels-like, humidity, pressure, wind speed, UV index, city name
- `aqi`        — AQI (US), PM2.5, PM10, O3
- `outfit`     — Clothing layers, accessories, warnings
- `health`     — Migraine risk, respiratory alerts
- `run_safety` — Score (0–100), verdict, reasons

**GET /health** returns:
- `status` — Service health indicatorts
- `run_safety` — Score (0–100), verdict, reasons

---

## Features

### Impact Engine (logic.py)
- **Smart Outfit Advisor** — Uses feels-like temp, wind speed, humidity, and UV index to suggest clothing layers and accessories
- **Health Alert System** — Monitors barometric pressure for migraine risk; AQI for respiratory safety
- **Run Safety Scorer** — Combines all factors into a 0–100 score with a plain-English verdict

### UI Highlights
- Dark cinematic theme with ambient glow effects
- Colour-coded safety indicators (green / amber / red)
- Animated score bar for run safety
- Real-time AQI breakdown (PM2.5, PM10, O3)
