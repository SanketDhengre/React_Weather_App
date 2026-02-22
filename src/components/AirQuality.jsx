import { Activity, Wind } from "lucide-react";

export default function AirQuality({ weather }) {
  const { aqi, components } = weather;

  const aqiMap = {
    1: { label: "Good", color: "text-green-400", bg: "bg-green-400/20", progress: "20%" },
    2: { label: "Fair", color: "text-yellow-400", bg: "bg-yellow-400/20", progress: "40%" },
    3: { label: "Moderate", color: "text-orange-400", bg: "bg-orange-400/20", progress: "60%" },
    4: { label: "Poor", color: "text-red-400", bg: "bg-red-400/20", progress: "80%" },
    5: { label: "Very Poor", color: "text-purple-400", bg: "bg-purple-400/20", progress: "100%" }
  };

  const status = aqiMap[aqi] || aqiMap[1];

  return (
    <div className="w-full h-full flex flex-col gap-4 p-6 bg-white/5 border border-white/10 rounded-3xl glass-panel relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="flex items-center justify-between">
        <div className="flex items-center text-white/60">
          <Activity className="w-5 h-5 mr-3" />
          <span className="font-medium tracking-wide uppercase text-sm">Air Quality</span>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-semibold ${status.bg} ${status.color}`}>
          {status.label}
        </div>
      </div>

      <div className="flex-1 mt-2">
        <div className="flex items-end gap-2 mb-3">
          <span className="text-5xl font-light text-white tracking-tighter">{aqi}</span>
          <span className="text-sm text-white/50 mb-1">/ 5 AQI Index</span>
        </div>
        
        <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden mt-2 relative">
          <div 
            className={`absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ${status.bg.replace('/20', '')}`}
            style={{ width: status.progress }}
          />
        </div>
        <div className="flex justify-between w-full mt-2 text-[10px] text-white/40 uppercase font-medium">
          <span>Good</span>
          <span>Hazardous</span>
        </div>
      </div>

      {components && (
        <div className="grid grid-cols-4 gap-2 mt-2 border-t border-white/10 pt-4">
          <div className="flex flex-col">
            <span className="text-[10px] text-white/50">PM2.5</span>
            <span className="text-xs text-white font-semibold">{components.pm2_5}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-white/50">PM10</span>
            <span className="text-xs text-white font-semibold">{components.pm10}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-white/50">NO2</span>
            <span className="text-xs text-white font-semibold">{components.no2}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-white/50">O3</span>
            <span className="text-xs text-white font-semibold">{components.o3}</span>
          </div>
        </div>
      )}
    </div>
  );
}
