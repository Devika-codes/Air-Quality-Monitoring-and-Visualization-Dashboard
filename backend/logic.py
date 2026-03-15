"""
VitalsAir — Impact Engine
Outfit advisor, health alerts, and run-safety scorer.
"""


# ─── Outfit Advisor ──────────────────────────────────────────────────────────

def get_outfit_advice(weather: dict) -> dict:
    feels = weather["feels_like"]
    wind = weather["wind_speed"]
    uv = weather.get("uv_index", 0)
    humidity = weather["humidity"]

    layers = []
    accessories = []
    warnings = []

    # Base layer
    if feels < 0:
        layers.append("Thermal base layer")
        layers.append("Heavy insulated jacket")
        layers.append("Insulated trousers")
        accessories += ["Beanie", "Gloves", "Scarf", "Thermal socks"]
    elif feels < 8:
        layers.append("Fleece or mid-layer")
        layers.append("Windproof outer jacket")
        layers.append("Jeans or thick trousers")
        accessories += ["Light gloves", "Beanie"]
    elif feels < 15:
        layers.append("Light jacket or hoodie")
        layers.append("Long-sleeve shirt")
        layers.append("Jeans or chinos")
    elif feels < 22:
        layers.append("T-shirt or light long-sleeve")
        layers.append("Lightweight trousers or jeans")
    else:
        layers.append("Breathable T-shirt")
        layers.append("Shorts or light trousers")
        if humidity > 70:
            warnings.append("High humidity — choose moisture-wicking fabrics")

    # Wind chill add-ons
    if wind > 10 and feels < 20:
        accessories.append("Windbreaker")
    if wind > 15:
        warnings.append("Strong winds — secure loose clothing and hair")

    # UV protection
    if uv >= 8:
        accessories += ["Sunglasses (UV400)", "Wide-brim hat", "SPF 50+ sunscreen"]
        warnings.append("Extreme UV — limit direct sun exposure between 10am–4pm")
    elif uv >= 5:
        accessories += ["Sunglasses", "Cap"]
        warnings.append("Moderate UV — apply SPF 30+")

    # Rain check (from description)
    return {
        "layers": layers,
        "accessories": accessories,
        "warnings": warnings,
        "summary": _outfit_summary(feels),
    }


def _outfit_summary(feels: float) -> str:
    if feels < 0:
        return "Bundle up — extreme cold conditions"
    elif feels < 8:
        return "Layer up — it's chilly out there"
    elif feels < 15:
        return "Light jacket recommended"
    elif feels < 22:
        return "Comfortable — dress light"
    else:
        return "Warm day — keep it breathable"


# ─── Health Alert System ─────────────────────────────────────────────────────

def get_health_alerts(weather: dict, aqi: dict) -> dict:
    alerts = []
    pressure = weather["pressure"]
    aqi_us = aqi["aqi_us"]
    pm25 = aqi["pm25"]
    o3 = aqi.get("o3", 0)

    # Barometric pressure — migraine risk
    migraine_risk = "Low"
    if pressure < 1000:
        migraine_risk = "High"
        alerts.append({
            "type": "migraine",
            "level": "high",
            "message": "Low barometric pressure detected — high migraine risk. Stay hydrated and avoid bright screens.",
        })
    elif pressure < 1013:
        migraine_risk = "Moderate"
        alerts.append({
            "type": "migraine",
            "level": "moderate",
            "message": "Pressure dropping — moderate migraine risk. Monitor symptoms.",
        })

    # AQI respiratory safety
    respiratory_risk = "Safe"
    if aqi_us > 200:
        respiratory_risk = "Hazardous"
        alerts.append({
            "type": "respiratory",
            "level": "critical",
            "message": "Hazardous air quality — stay indoors. Use air purifier if available.",
        })
    elif aqi_us > 150:
        respiratory_risk = "Unhealthy"
        alerts.append({
            "type": "respiratory",
            "level": "high",
            "message": "Unhealthy AQI — sensitive groups must stay indoors. Wear N95 if going out.",
        })
    elif aqi_us > 100:
        respiratory_risk = "Moderate Risk"
        alerts.append({
            "type": "respiratory",
            "level": "moderate",
            "message": "Moderate AQI — limit prolonged outdoor exertion.",
        })

    # PM2.5 fine particles
    if pm25 > 35:
        alerts.append({
            "type": "pm25",
            "level": "high",
            "message": f"PM2.5 at {pm25:.1f} µg/m³ — well above safe limit. Avoid outdoor exercise.",
        })

    # Ozone
    if o3 > 100:
        alerts.append({
            "type": "ozone",
            "level": "moderate",
            "message": "Elevated ozone levels — avoid outdoor activity during afternoon peak.",
        })

    return {
        "alerts": alerts,
        "migraine_risk": migraine_risk,
        "respiratory_risk": respiratory_risk,
        "pressure_hpa": pressure,
        "aqi_us": aqi_us,
    }


# ─── Run Safety Scorer ────────────────────────────────────────────────────────

def get_run_safety(weather: dict, aqi: dict) -> dict:
    score = 100
    reasons = []

    feels = weather["feels_like"]
    wind = weather["wind_speed"]
    humidity = weather["humidity"]
    aqi_us = aqi["aqi_us"]
    uv = weather.get("uv_index", 0)

    if feels < 0 or feels > 38:
        score -= 40
        reasons.append("Extreme temperature")
    elif feels < 5 or feels > 33:
        score -= 20
        reasons.append("Uncomfortable temperature for running")

    if aqi_us > 150:
        score -= 40
        reasons.append("Unhealthy air quality")
    elif aqi_us > 100:
        score -= 20
        reasons.append("Moderate AQI — shorten run")

    if wind > 15:
        score -= 15
        reasons.append("Strong winds")
    elif wind > 10:
        score -= 5
        reasons.append("Breezy conditions")

    if humidity > 85:
        score -= 10
        reasons.append("Very high humidity")

    if uv >= 8:
        score -= 10
        reasons.append("High UV — run early morning or evening")

    score = max(0, score)

    if score >= 80:
        verdict = "Safe to run outside"
        color = "green"
    elif score >= 55:
        verdict = "Run with caution"
        color = "yellow"
    else:
        verdict = "Not recommended — stay indoors"
        color = "red"

    return {
        "score": score,
        "verdict": verdict,
        "color": color,
        "reasons": reasons,
    }
