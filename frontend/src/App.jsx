import { useState } from "react";
import Dashboard from "./components/Dashboard";
import SearchBar from "./components/SearchBar";

export default function App() {
  const [city, setCity] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDashboard = async (cityName) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `http://localhost:8000/api/dashboard/${encodeURIComponent(cityName)}`
      );
      if (!res.ok) throw new Error("City not found or API error");
      const json = await res.json();
      setData(json);
      setCity(cityName);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050810] text-white font-sans">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-cyan-900/15 rounded-full blur-[100px]" />
      </div>
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12">
        <div className="mb-12 text-center">
          <p className="text-xs tracking-[0.3em] text-cyan-500/70 uppercase mb-3">
            Environmental Intelligence
          </p>
          <h1 className="text-4xl font-light tracking-tight text-white">
            Vitals<span className="text-cyan-400 font-medium">Air</span>
          </h1>
          <p className="text-sm text-white/30 mt-2">
            Real-time weather, air quality & lifestyle insights
          </p>
        </div>
        <SearchBar onSearch={fetchDashboard} loading={loading} />
        {error && (
          <div className="mt-6 text-center text-red-400/80 text-sm">{error}</div>
        )}
        {data && !loading && <Dashboard data={data} city={city} />}
        {!data && !loading && !error && (
          <div className="mt-24 text-center text-white/20 text-sm tracking-wide">
            Enter a city to begin
          </div>
        )}
      </div>
    </main>
  );
}