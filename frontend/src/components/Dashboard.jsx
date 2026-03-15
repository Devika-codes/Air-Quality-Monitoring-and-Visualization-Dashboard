import InsightCard from "./InsightCard";
import OutfitCard from "./OutfitCard";
import HealthCard from "./HealthCard";
import AQICard from "./AQICard";

export default function Dashboard({ data, city }) {
  const { weather, aqi, outfit, health, run_safety } = data;

  return (
    <div className="mt-10 space-y-4 animate-fade-in">
      <div className="flex items-end justify-between mb-2 px-1">
        <div>
          <h2 className="text-2xl font-light text-white capitalize">{city}</h2>
          <p className="text-white/40 text-sm capitalize">{weather.description}</p>
        </div>
        <div className="text-right">
          <p className="text-4xl font-thin text-white">{Math.round(weather.temp)}°</p>
          <p className="text-white/30 text-xs">Feels {Math.round(weather.feels_like)}°</p>
        </div>
      </div>
      <InsightCard runSafety={run_safety} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AQICard aqi={aqi} />
        <HealthCard health={health} />
      </div>
      <OutfitCard outfit={outfit} weather={weather} />
    </div>
  );
}