import { motion } from "framer-motion";
import { useWeatherStore } from "../store/useWeatherStore";
import { useEffect, useState, useMemo } from "react";

const RainParticles = () => {
  const rainDrops = useMemo(() => Array.from({ length: 60 }), []);
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
      {rainDrops.map((_, i) => {
        const xPos = Math.random() * 100;
        const delay = Math.random() * 1;
        const duration = Math.random() * 0.4 + 0.4;
        const opacity = Math.random() * 0.4 + 0.2;
        return (
          <motion.div
            key={`rain-${i}`}
            className="absolute w-[2px] h-[30px] bg-blue-300 rounded-full"
            style={{ left: `${xPos}vw`, opacity }}
            initial={{ top: -40 }}
            animate={{ top: "110vh" }}
            transition={{
              duration: duration,
              repeat: Infinity,
              ease: "linear",
              delay: delay,
            }}
          />
        );
      })}
    </div>
  );
};

const SnowParticles = () => {
  const snowFlakes = useMemo(() => Array.from({ length: 50 }), []);
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
      {snowFlakes.map((_, i) => {
        const xPos = Math.random() * 100;
        const delay = Math.random() * 4;
        const duration = Math.random() * 4 + 4;
        const size = Math.random() * 4 + 2;
        const opacity = Math.random() * 0.5 + 0.4;
        return (
          <motion.div
            key={`snow-${i}`}
            className="absolute bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"
            style={{ width: size, height: size, left: `${xPos}vw`, opacity }}
            initial={{ top: -20, x: 0 }}
            animate={{ top: "110vh", x: Math.random() > 0.5 ? 50 : -50 }}
            transition={{
              top: { duration: duration, repeat: Infinity, ease: "linear", delay: delay },
              x: { duration: duration * 1.5, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: delay },
            }}
          />
        );
      })}
    </div>
  );
};

const CloudParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
      <motion.div
        className="absolute top-[10%] -left-[40%] w-[600px] h-[150px] bg-white/20 rounded-full filter blur-[80px]"
        animate={{ x: "150vw" }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute top-[40%] -left-[50%] w-[800px] h-[200px] bg-white/10 rounded-full filter blur-[100px]"
        animate={{ x: "150vw" }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear", delay: 15 }}
      />
      <motion.div
        className="absolute top-[70%] -left-[60%] w-[700px] h-[180px] bg-white/15 rounded-full filter blur-[90px]"
        animate={{ x: "150vw" }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear", delay: 5 }}
      />
    </div>
  );
};


export default function CanvasBackground() {
  const weather = useWeatherStore((state) => state.weather);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  let isNight = false;
  let code = "Clear";

  if (weather) {
    isNight = weather.dt < weather.sunrise || weather.dt > weather.sunset;
    const atmosphericCodes = ["Mist", "Smoke", "Haze", "Dust", "Fog", "Sand", "Ash", "Squall", "Tornado"];
    code = atmosphericCodes.includes(weather.details) ? "Atmosphere" : weather.details;
  }
  
  const isRaining = code === "Rain" || code === "Drizzle";
  const isSnowing = code === "Snow";
  const isThunderstorm = code === "Thunderstorm";
  const isCloudy = code === "Clouds" || code === "Atmosphere";

  // Base Clear Themes
  let gradientDay = `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, #38bdf8 0%, #0369a1 60%)`;
  let gradientNight = `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, #1e1b4b 0%, #020617 60%)`;

  let orbDay1 = "#bae6fd";
  let orbDay2 = "#818cf8";
  let orbNight1 = "#4c1d95";
  let orbNight2 = "#1d4ed8";

  // Dynamic Modifiers 
  if (isCloudy) {
    gradientDay = `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, #94a3b8 0%, #334155 60%)`;
    gradientNight = `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, #1e293b 0%, #020617 60%)`;
    orbDay1 = "#cbd5e1";
    orbDay2 = "#64748b";
    orbNight1 = "#334155";
    orbNight2 = "#0f172a";
  } else if (isRaining) {
    gradientDay = `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, #475569 0%, #0f172a 60%)`;
    gradientNight = `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, #0f172a 0%, #020617 60%)`;
    orbDay1 = "#64748b";
    orbDay2 = "#334155";
    orbNight1 = "#1e293b";
    orbNight2 = "#020617";
  } else if (isThunderstorm) {
    gradientDay = `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, #1e293b 0%, #020617 60%)`;
    gradientNight = `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, #020617 0%, #000000 60%)`;
    orbDay1 = "#475569";
    orbDay2 = "#1e1b4b";
    orbNight1 = "#1e1b4b";
    orbNight2 = "#000000";
  } else if (isSnowing) {
    gradientDay = `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, #e2e8f0 0%, #94a3b8 60%)`;
    gradientNight = `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, #334155 0%, #0f172a 60%)`;
    orbDay1 = "#ffffff";
    orbDay2 = "#cbd5e1";
    orbNight1 = "#cbd5e1";
    orbNight2 = "#64748b";
  } 

  const currentGradient = isNight ? gradientNight : gradientDay;
  const currentOrb1 = isNight ? orbNight1 : orbDay1;
  const currentOrb2 = isNight ? orbNight2 : orbDay2;

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-black pointer-events-none transition-colors duration-1000">
      <motion.div
        animate={{ background: currentGradient }}
        transition={{ type: "tween", ease: "linear", duration: 0.2 }}
        className="absolute inset-0 opacity-80"
      />
      
      {/* Mesh Orbs */}
      <motion.div
        animate={{
          x: [0, 50, -50, 0],
          y: [0, -50, 50, 0],
          scale: [1, 1.2, 0.8, 1],
          backgroundColor: currentOrb1
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full mix-blend-screen filter blur-[100px] opacity-40 transition-colors duration-1000"
      />

      <motion.div
        animate={{
          x: [0, -100, 100, 0],
          y: [0, 100, -100, 0],
          scale: [1, 1.5, 0.9, 1],
          backgroundColor: currentOrb2
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full mix-blend-screen filter blur-[120px] opacity-30 transition-colors duration-1000"
      />
      
      {/* Atmospheric Particles Systems */}
      {isRaining && <RainParticles />}
      {isSnowing && <SnowParticles />}
      {(isCloudy || isRaining || isThunderstorm) && <CloudParticles />}

      {/* Lightning Flash System */}
      {isThunderstorm && (
        <motion.div
          animate={{ opacity: [0, 0, 0.8, 0, 0, 0.4, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-white mix-blend-overlay z-[5]"
        />
      )}
      
      {/* Persistent Base Noise Overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/micro-carbon.png')] opacity-30 mix-blend-overlay z-[2]" />
    </div>
  );
}


