import { Sparkles } from "lucide-react";

export default function AIAssistant({ weather }) {
  const { details, temp, name, speed, humidity, cloudiness, aqi } = weather;

  const generateInsight = () => {
    let insight = `Right now in ${name}, it is ${temp.toFixed()}° with ${details.toLowerCase()}. `;

    // Temp logic
    if (temp < 10) insight += "It's quite chilly. Wear a heavy coat! ";
    else if (temp < 18) insight += "It's a bit brisk, a light jacket would be ideal. ";
    else if (temp > 28) insight += "It's hot outside! Remember to stay hydrated. ";

    // Context logic
    if (details.includes("Rain") || details.includes("Drizzle")) {
      insight += "Definitely carry an umbrella if you're heading out. ";
    }
    if (speed > 8) {
      insight += "It's also quite windy. ";
    }
    
    // AI twist
    if (aqi === 1 || aqi === 2) {
      insight += " The air quality is excellent today, perfect for outdoor activities.";
    } else if (aqi >= 4) {
      insight += " However, the air quality is poor. Please wear a mask and limit outdoor exposure.";
    }

    return insight;
  };

  return (
    <div className="w-full flex items-center p-5 bg-white/5 border border-white/10 rounded-2xl glass-panel relative overflow-hidden group shadow-lg">
      <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center mr-4 border border-indigo-500/30 flex-shrink-0 animate-pulse">
        <Sparkles className="w-6 h-6 text-indigo-300" />
      </div>
      <div className="flex flex-col">
        <span className="text-xs uppercase tracking-widest text-indigo-300 font-bold mb-1">
          Smart Insight
        </span>
        <p className="text-white/80 text-sm md:text-base font-medium leading-relaxed">
          "{generateInsight()}"
        </p>
      </div>
    </div>
  );
}
