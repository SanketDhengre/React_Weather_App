import { 
  CloudRain, 
  Wind, 
  Droplets,
  ThermometerSun,
  Sunrise,
  Sunset,
  ArrowUp,
  ArrowDown,
  Eye,
  Cloud,
  Compass,
  Gauge
} from "lucide-react";
import { motion } from "framer-motion";

const getWindDirection = (deg) => {
  if (deg > 337.5 || deg <= 22.5) return 'N';
  if (deg > 22.5 && deg <= 67.5) return 'NE';
  if (deg > 67.5 && deg <= 112.5) return 'E';
  if (deg > 112.5 && deg <= 157.5) return 'SE';
  if (deg > 157.5 && deg <= 202.5) return 'S';
  if (deg > 202.5 && deg <= 247.5) return 'SW';
  if (deg > 247.5 && deg <= 292.5) return 'W';
  if (deg > 292.5 && deg <= 337.5) return 'NW';
  return '';
};

export default function TempAndDetails({ weather, units }) {
  const { details, icon, temp, speed, deg, temp_min, temp_max, sunrise, sunset, humidity, feels_like, visibility, cloudiness, pressure } = weather;

  const visibilityValue = units === "metric" 
    ? `${(visibility / 1000).toFixed(1)} km`
    : `${(visibility / 1609.34).toFixed(1)} mi`;

  const verticalDetails = [
    { id: 1, Icon: ThermometerSun, title: "Real Feel", value: `${feels_like.toFixed()}°` },
    { id: 2, Icon: Droplets, title: "Humidity", value: `${humidity.toFixed()}%` },
    { id: 3, Icon: Wind, title: "Wind", value: `${speed.toFixed()} ${units === "metric" ? "m/s" : "mph"}` },
    { id: 4, Icon: Compass, title: "Wind Dir", value: `${deg}° ${getWindDirection(deg)}` },
    { id: 5, Icon: Eye, title: "Visibility", value: visibilityValue },
    { id: 6, Icon: Gauge, title: "Pressure", value: `${pressure} hPa` },
    { id: 7, Icon: Cloud, title: "Cloud Cover", value: `${cloudiness}%` },
  ];

  const horizontalDetails = [
    { id: 1, Icon: Sunrise, title: "Sunrise", value: sunrise },
    { id: 2, Icon: Sunset, title: "Sunset", value: sunset },
    { id: 3, Icon: ArrowUp, title: "High", value: `${temp_max.toFixed()}°` },
    { id: 4, Icon: ArrowDown, title: "Low", value: `${temp_min.toFixed()}°` },
  ];

  return (
    <div className="w-full flex flex-col relative z-10 gap-8">
      
      {/* Primary Temperature Display - Fully Centered Col Block */}
      <div className="flex flex-col items-center justify-center w-full">
        <div className="flex items-center justify-center gap-4">
          <motion.img
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            src={icon}
            alt="weather icon"
            className="w-28 h-28 lg:w-32 lg:h-32 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] filter"
          />
          <span className="text-7xl lg:text-8xl font-light tracking-tighter leading-none text-glow">
            {temp.toFixed()}°
          </span>
        </div>
        <span className="text-2xl font-medium text-white/90 tracking-wide mt-2 capitalize text-center">
          {details}
        </span>
      </div>

      {/* Small Widgets Layout fix - 2 Column Grid */}
      <div className="w-full grid grid-cols-2 gap-3 glass-panel p-4 rounded-3xl bg-white/5 border border-white/10">
        {verticalDetails.map(({ id, Icon, title, value }) => (
          <div key={id} className={`flex flex-col items-start justify-center gap-1.5 p-3 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition duration-300 ${id === 7 ? "col-span-2 flex-row justify-between items-center" : ""}`}>
            <div className="flex items-center text-white/60">
              <Icon className="w-4 h-4 mr-2" />
              <span className="text-xs font-medium uppercase tracking-wider">{title}</span>
            </div>
            <span className={`font-semibold text-white md:text-lg pl-6 drop-shadow-md ${id === 7 ? "pl-0 pr-2" : ""}`}>{value}</span>
          </div>
        ))}
      </div>

      {/* Footer Metrics - 2 Column Grid */}
      <div className="grid grid-cols-2 gap-3 mt-auto w-full">
        {horizontalDetails.map(({ id, Icon, title, value }) => (
          <div 
            key={id} 
            className="flex items-center p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
          >
            <div className="p-2 bg-white/10 rounded-full mr-3">
              <Icon className="w-5 h-5 text-white/80" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] md:text-xs font-medium text-white/50 uppercase tracking-wider">{title}</span>
              <span className="text-sm border-0 md:text-base font-semibold text-white mt-0.5">{value}</span>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
}


