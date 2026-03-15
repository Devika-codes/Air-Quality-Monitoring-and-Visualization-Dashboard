const levelStyle = {
  critical: "text-red-400 border-red-500/20 bg-red-500/5",
  high:     "text-orange-400 border-orange-500/20 bg-orange-500/5",
  moderate: "text-amber-400 border-amber-500/20 bg-amber-500/5",
  low:      "text-emerald-400 border-emerald-500/20 bg-emerald-500/5",
};

const riskColor = {
  Low: "text-emerald-400", Moderate: "text-amber-400", High: "text-red-400",
  Safe: "text-emerald-400", "Moderate Risk": "text-amber-400",
  Unhealthy: "text-orange-400", Hazardous: "text-red-500",
};

export default function HealthCard({ health }) {
  const { alerts, migraine_risk, respiratory_risk, pressure_hpa } = health;
  return (
    <div className="rounded-2xl border border-white/8 bg-white/3 p-6 backdrop-blur-sm">
      <span className="text-xs tracking-[0.2em] text-white/40 uppercase block mb-5">Health Alerts</span>
      <div className="grid grid-cols-2 gap-4 mb-5">
        <div>
          <p className="text-xs text-white/30 mb-1">Migraine Risk</p>
          <p className={`text-sm font-medium ${riskColor[migraine_risk] || "text-white"}`}>{migraine_risk}</p>
          <p className="text-xs text-white/20 mt-1">{pressure_hpa} hPa</p>
        </div>
        <div>
          <p className="text-xs text-white/30 mb-1">Respiratory</p>
          <p className={`text-sm font-medium ${riskColor[respiratory_risk] || "text-white"}`}>{respiratory_risk}</p>
        </div>
      </div>
      <div className="space-y-2">
        {alerts.length === 0
          ? <p className="text-xs text-white/25">No active health alerts</p>
          : alerts.map((a, i) => (
              <div key={i} className={`rounded-xl border px-4 py-3 text-xs leading-relaxed ${levelStyle[a.level] || levelStyle.low}`}>
                {a.message}
              </div>
            ))
        }
      </div>
    </div>
  );
}