import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { TrendingUp } from "lucide-react";

export default function WeatherChart({ daily, units }) {
  // Taking a subset of hourly or daily format them for the chart
  const data = daily.slice(0, 7).map((d) => ({
    name: d.title,
    temp: d.temp,
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-panel bg-zinc-900/80 border border-white/20 p-3 rounded-xl shadow-2xl backdrop-blur-md">
          <p className="text-white/60 text-xs mb-1 font-medium">{label}</p>
          <p className="text-white font-semibold text-lg">{`${payload[0].value.toFixed()}°${units === 'metric' ? 'C' : 'F'}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-full flex flex-col p-6 bg-white/5 border border-white/10 rounded-3xl glass-panel relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div className="flex items-center text-white/60">
          <TrendingUp className="w-5 h-5 mr-3 text-sky-400" />
          <span className="font-medium tracking-wide uppercase text-sm">Temperature Trend</span>
        </div>
        <span className="text-xs text-white/40 mt-1 md:mt-0 bg-white/5 px-3 py-1 rounded-full border border-white/5">
          7-Day Trajectory
        </span>
      </div>

      <div className="flex-1 w-full min-h-[250px] -ml-4 mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="name" 
              stroke="#ffffff30" 
              tick={{ fill: "#ffffff80", fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              dy={10}
            />
            <YAxis 
              stroke="#ffffff30" 
              tick={{ fill: "#ffffff80", fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(val) => `${val}°`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#ffffff20', strokeWidth: 1, strokeDasharray: '3 3' }} />
            <Area
              type="monotone"
              dataKey="temp"
              stroke="#38bdf8"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#tempGradient)"
              activeDot={{ r: 6, fill: '#38bdf8', stroke: '#fff', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
