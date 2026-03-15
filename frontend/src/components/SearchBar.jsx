import { useState } from "react";

export default function SearchBar({ onSearch, loading }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) onSearch(input.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 max-w-lg mx-auto">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter city name..."
        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-5 py-3
                   text-white placeholder-white/25 text-sm outline-none
                   focus:border-cyan-500/50 transition-all duration-200"
      />
      <button
        type="submit"
        disabled={loading}
        className="px-6 py-3 bg-cyan-500/15 border border-cyan-500/30 rounded-xl
                   text-cyan-400 text-sm font-medium tracking-wide
                   hover:bg-cyan-500/25 disabled:opacity-40 transition-all duration-200"
      >
        {loading ? "..." : "Analyse"}
      </button>
    </form>
  );
}