export default function OutfitCard({ outfit, weather }) {
  const { layers, accessories, warnings, summary } = outfit;
  return (
    <div className="rounded-2xl border border-white/8 bg-white/3 p-6 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-5">
        <span className="text-xs tracking-[0.2em] text-white/40 uppercase">Smart Outfit</span>
        <span className="text-xs text-cyan-400/70">{summary}</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <p className="text-xs text-white/30 mb-3">Clothing Layers</p>
          <ul className="space-y-2">
            {layers.map((l, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-white/70">
                <span className="w-1 h-1 rounded-full bg-cyan-400/50 flex-shrink-0" />{l}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs text-white/30 mb-3">Accessories</p>
          {accessories.length === 0
            ? <p className="text-xs text-white/25">None needed</p>
            : <ul className="space-y-2">
                {accessories.map((a, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-white/70">
                    <span className="w-1 h-1 rounded-full bg-violet-400/50 flex-shrink-0" />{a}
                  </li>
                ))}
              </ul>
          }
        </div>
        <div>
          <p className="text-xs text-white/30 mb-3">Heads Up</p>
          {warnings.length === 0
            ? <p className="text-xs text-white/25">All clear</p>
            : <ul className="space-y-2">
                {warnings.map((w, i) => (
                  <li key={i} className="text-xs text-amber-400/80 leading-relaxed">⚠ {w}</li>
                ))}
              </ul>
          }
        </div>
      </div>
      <div className="mt-5 pt-4 border-t border-white/5 flex gap-6">
        <div><p className="text-xs text-white/25">Humidity</p><p className="text-sm text-white/60">{weather.humidity}%</p></div>
        <div><p className="text-xs text-white/25">Wind</p><p className="text-sm text-white/60">{weather.wind_speed} m/s</p></div>
        <div><p className="text-xs text-white/25">UV Index</p><p className="text-sm text-white/60">{weather.uv_index ?? "—"}</p></div>
      </div>
    </div>
  );
}