import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import getFormattedWeatherData from "./services/weatherService";
import { useWeatherStore } from "./store/useWeatherStore";

import CanvasBackground from "./components/CanvasBackground";
import CommandPalette from "./components/CommandPalette";
import Inputs from "./components/Inputs";
import TimeAndLocation from "./components/TimeAndLocation";
import TempAndDetails from "./components/TempAndDetails";
import Forecast from "./components/Forecast";
import TopButtons from "./components/TopButtons";
import AirQuality from "./components/AirQuality";
import WeatherChart from "./components/WeatherChart";
import WeatherMap from "./components/WeatherMap";
import AIAssistant from "./components/AIAssistant";
import { Loader2 } from "lucide-react";

export default function App() {
  const { query, units, setWeather } = useWeatherStore();

  const { data: weather, isLoading, error } = useQuery({
    queryKey: ["weather", query, units],
    queryFn: async () => {
      const cityName = query.q || 'current location';
      try {
        const data = await getFormattedWeatherData({ ...query, units });
        setWeather(data);
        return data;
      } catch (err) {
        toast.error(`Error fetching weather for ${cityName}`);
        throw err;
      }
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 mins
  });

  return (
    <div className="relative min-h-screen font-sans selection:bg-white/30 text-white overflow-hidden">
      <CanvasBackground />
      <CommandPalette />
      
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen flex flex-col">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="flex-1 w-full">
            <TopButtons />
          </div>
          <div className="flex-1 w-full flex justify-end">
            <Inputs />
          </div>
        </header>

        {/* Content Section */}
        <div className="flex-1 flex flex-col items-center justify-center w-full">
          <AnimatePresence mode="wait">
            {isLoading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex items-center justify-center flex-col space-y-4"
              >
                <Loader2 className="w-12 h-12 animate-spin text-white/50" />
                <p className="text-white/50 font-medium tracking-wide animate-pulse">
                  Acquiring atmospheric data...
                </p>
              </motion.div>
            )}

            {error && (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center bg-red-500/10 border border-red-500/20 text-red-200 px-8 py-4 rounded-2xl glass-panel"
              >
                <p className="font-medium text-lg">Unable to locate coordinates.</p>
                <p className="text-sm opacity-70 mt-1">Please try searching for another city.</p>
              </motion.div>
            )}

            {weather && !isLoading && (
              <motion.div
                key="content"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-[85rem] grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8"
              >
                {/* Left Column - Main Info */}
                <div className="lg:col-span-5 flex flex-col gap-6">
                  
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <AIAssistant weather={weather} />
                  </motion.div>

                  <motion.div 
                    className="glass-panel rounded-3xl p-8 shadow-2xl relative overflow-hidden group"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <TimeAndLocation weather={weather} />
                  </motion.div>
                  
                  <motion.div 
                    className="glass-panel rounded-3xl p-8 shadow-2xl relative overflow-hidden group flex-1 flex items-center justify-center"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                  >
                     <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <TempAndDetails weather={weather} units={units} />
                  </motion.div>

                </div>

                {/* Right Column - Forecasts & Deep Stats */}
                <div className="lg:col-span-7 flex flex-col gap-6">
                  
                  {/* Top Row: Map & AQI */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[320px]">
                    <motion.div 
                      className="h-full"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <WeatherMap weather={weather} />
                    </motion.div>
                    
                    <motion.div 
                      className="h-full"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <AirQuality weather={weather} />
                    </motion.div>
                  </div>

                  {/* Mid Row: Spline Chart */}
                  <motion.div 
                    className="h-[280px] w-full mt-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <WeatherChart daily={weather.hourly} units={units} />
                  </motion.div>

                  {/* Bottom Row: Minimal Mini Forecasts */}
                  <div className="flex flex-col gap-6 w-full">
                    <motion.div 
                      className="glass-panel rounded-3xl p-6 shadow-2xl relative overflow-hidden group w-full"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <Forecast title="3-Hour Step Forecast" data={weather.hourly} />
                    </motion.div>

                    <motion.div 
                      className="glass-panel rounded-3xl p-6 shadow-2xl relative overflow-hidden group w-full"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <Forecast title="Daily Forecast" data={weather.daily} />
                    </motion.div>
                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      
      {/* Keyboard Shortcut Hint for Desktop */}
      <div className="fixed bottom-6 right-6 hidden md:flex items-center gap-2 text-white/30 text-sm font-medium px-4 py-2 rounded-full glass-panel pointer-events-none">
        <span>Press</span>
        <kbd className="px-2 py-0.5 rounded bg-white/10 font-mono text-xs">⌘</kbd>
        <span>+</span>
        <kbd className="px-2 py-0.5 rounded bg-white/10 font-mono text-xs">K</kbd>
        <span>for Command Palette</span>
      </div>

      <ToastContainer position="top-center" autoClose={2000} theme="dark" toastClassName={() => "relative flex p-4 min-h-10 rounded-2xl justify-between overflow-hidden cursor-pointer glass-panel border border-white/10 text-white mb-4 bg-zinc-900/50 backdrop-blur-xl shadow-2xl"} bodyClassName={() => "text-sm font-medium block p-3"} />
    </div>
  );
}
