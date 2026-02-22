import { motion } from "framer-motion";
import { useWeatherStore } from "../store/useWeatherStore";
import { cn } from "../lib/utils";

export default function TopButtons() {
  const { setQuery, query } = useWeatherStore();

  const cities = [
    { id: 1, name: "London" },
    { id: 2, name: "Sydney" },
    { id: 3, name: "Tokyo" },
    { id: 4, name: "Paris" },
    { id: 5, name: "San Francisco" },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-4 md:justify-start">
      {cities.map((city) => {
        const isActive = query.q === city.name;
        return (
          <motion.button
            key={city.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
              "border backdrop-blur-md shadow-lg",
              isActive 
                ? "bg-white/20 border-white/40 text-white text-glow shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white"
            )}
            onClick={() => setQuery({ q: city.name })}
          >
            {city.name}
          </motion.button>
        );
      })}
    </div>
  );
}
