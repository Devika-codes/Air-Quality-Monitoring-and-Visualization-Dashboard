const colorMap = {
  green:  { border: "border-emerald-500/30", bg: "bg-emerald-500/8", dot: "bg-emerald-400", text: "text-emerald-400", bar: "bg-emerald-400" },
  yellow: { border: "border-amber-500/30",   bg: "bg-amber-500/8",   dot: "bg-amber-400",   text: "text-amber-400",   bar: "bg-amber-400"   },
  red:    { border: "border-red-500/30",     bg: "bg-red-500/8",     dot: "bg-red-400",     text: "text-red-400",     bar: "bg-red-400"     },
};

export default function InsightCard({ runSafety }) {
  const { score, verdict, color, reasons } = runSafety;
  const c = colorMap[color] || colorMap.green;

  return (
    <div className={`rounded-2xl border ${c.border} ${c.bg} p-6 backdrop-blur-sm`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${c.dot} animate-pulse`} />
          <span className="text-xs tracking-[0.2em] text-white/40 uppercase">Outdoor Activity</span>
        </div>
        <span className={`text-xs font-medium ${c.text}`}>Score {score}/100</span>
      </div>
      <p className={`text-2xl font-light ${c.text} mb-4`}>{verdict}</p>
      <div className="w-full h-1 bg-white/5 rounded-full mb-4 overflow-hidden">
        <div className={`h-full ${c.bar} rounded-full transition-all duration-700`} style={{ width: `${score}%` }} />
      </div>
      {reasons.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {reasons.map((r, i) => (
            <span key={i} className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/8 text-white/40">{r}</span>
          ))}
        </div>
      )}
    </div>
  );
}