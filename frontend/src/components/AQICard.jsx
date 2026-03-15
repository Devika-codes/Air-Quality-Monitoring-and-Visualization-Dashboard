function aqiLevel(aqi) {
  if (aqi <= 50)  return { label: "Good",                 color: "text-emerald-400" };
  if (aqi <= 100) return { label: "Moderate",             color: "text-yellow-400"  };
  if (aqi <= 150) return { label: "Unhealthy (Sensitive)",color: "text-orange-400"  };
  if (aqi <= 200) return { label: "Unhealthy",            color: "text-red-400"     };
  return                 { label: "Hazardous",            color: "text-red-600"     };
}

function Metric({ label, value, unit }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs text-white/30">{label}</span>
      <span className="text-lg font-light text-white">
        {value}<span className="text-xs text-white/30 ml-1">{unit}</span>
      </span>
    </div>
  );
}

export default function AQICard({ aqi }) {
  const { aqi_us, pm25, pm10, o3 } = aqi;
  const level = aqiLevel(aqi_us);
  return (
    <div className="rounded-2xl border border-white/8 bg-white/3 p-6 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-5">
        <span className="text-xs tracking-[0.2em] text-white/40 uppercase">Air Quality</span>
        <span className={`text-xs font-medium ${level.color}`}>{level.label}</span>
      </div>
      <p className="text-5xl font-thin text-white mb-1">{aqi_us}</p>
      <p className="text-xs text-white/30 mb-6">US AQI Index</p>
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/5">
        <Metric label="PM2.5" value={pm25.toFixed(1)} unit="µg/m³" />
        <Metric label="PM10"  value={pm10.toFixed(1)} unit="µg/m³" />
        <Metric label="O₃"    value={o3.toFixed(1)}   unit="µg/m³" />
      </div>
    </div>
  );
}