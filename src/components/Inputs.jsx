import { useState } from "react";
import { Search, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { useWeatherStore } from "../store/useWeatherStore";
import { cn } from "../lib/utils";

export default function Inputs() {
  const [city, setCity] = useState("");
  const { setQuery, setUnits, units } = useWeatherStore();

  const handleSearchClick = () => {
    if (city.trim() !== "") {
      setQuery({ q: city });
      setCity("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearchClick();
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setQuery({ lat: latitude, lon: longitude });
      });
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-end">
      {/* Search Bar */}
      <div className="relative group w-full sm:w-auto">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="w-4 h-4 text-white/50 group-hover:text-white/80 transition-colors" />
        </div>
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyDown}
          type="text"
          placeholder="Search location..."
          className={cn(
            "w-full sm:w-64 pl-10 pr-10 py-2.5 rounded-full text-sm font-medium",
            "bg-white/5 glass-panel border-white/10 text-white placeholder:text-white/40",
            "focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300"
          )}
        />
        <button
          onClick={handleLocationClick}
          className="absolute inset-y-0 right-0 flex items-center pr-3 group/btn hover:scale-110 transition-transform"
          title="Current Location"
        >
          <MapPin className="w-4 h-4 text-white/50 group-hover/btn:text-white transition-colors" />
        </button>
      </div>

      {/* unit toggle */}
      <div className="glass-panel rounded-full p-1 flex items-center border-white/10 shadow-lg">
        <button
          className={cn(
            "px-3 py-1.5 rounded-full text-xs font-semibold transition-all",
            units === "metric" ? "bg-white text-black shadow-md" : "text-white/60 hover:text-white"
          )}
          onClick={() => setUnits("metric")}
        >
          °C
        </button>
        <button
          className={cn(
            "px-3 py-1.5 rounded-full text-xs font-semibold transition-all",
            units === "imperial" ? "bg-white text-black shadow-md" : "text-white/60 hover:text-white"
          )}
          onClick={() => setUnits("imperial")}
        >
          °F
        </button>
      </div>
    </div>
  );
}
