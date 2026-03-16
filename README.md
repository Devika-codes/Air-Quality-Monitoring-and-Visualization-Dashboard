# VitalsAir 🌬️
> **Environmental Intelligence: Real-time weather, air quality, and actionable lifestyle insights.**

VitalsAir is a sophisticated "Environmental Intelligence" platform that goes beyond simple forecasting. It translates raw atmospheric data—like barometric pressure, UV index, and particulate matter—into actionable health and lifestyle recommendations.

---

## 🚀 Key Features
- **Smart Outfit Advisor** — Uses feels-like temp, wind speed, humidity, and UV index to suggest clothing layers and accessories
- **Health Alert System** — Monitors barometric pressure for migraine risk; AQI for respiratory safety
- **Run Safety Scorer** — Combines all factors into a 0–100 score with a plain-English verdict

## 📸 Sample Output
**Location:** London  
**Conditions:** 10°C (Feels 9°C), Light Rain  
**Insights Generated:**
* **Health:** "Pressure dropping — moderate migraine risk. Monitor symptoms."
* **AQI Warning:** "PM2.5 at 42.0 µg/m³ — well above safe limit. Avoid outdoor exercise."
* **Outfit:** "Light jacket or hoodie + Jeans recommended."

## 📂 Project Structure
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
**GET /api/dashboard/{city}** returns:
- `weather`    — Temp, feels-like, humidity, pressure, wind speed, UV index, city name
- `aqi`        — AQI (US), PM2.5, PM10, O3
- `outfit`     — Clothing layers, accessories, warnings
- `health`     — Migraine risk, respiratory alerts
- `run_safety` — Score (0–100), verdict, reasons

