import { MapPin } from "lucide-react";

export default function TimeAndLocation({ weather: { formattedLocalTime, name, country } }) {
  // Extract date and time if possible or just use formatted
  const [datePart, timePart] = formattedLocalTime ? formattedLocalTime.split(" | Local time: ") : ["", ""];

  return (
    <div className="flex flex-col h-full justify-between items-start text-left gap-4 relative z-10">
      <div>
        <h2 className="text-sm md:text-base font-medium text-white/70 uppercase tracking-widest mb-1">
          {datePart}
        </h2>
        <p className="text-3xl font-light text-white/90">
          {timePart}
        </p>
      </div>

      <div className="mt-8 flex items-center">
        <MapPin className="w-8 h-8 md:w-10 md:h-10 text-white mr-3 animate-pulse" />
        <div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white drop-shadow-lg">
            {name}
          </h1>
          <p className="text-lg md:text-xl font-medium text-white/70 tracking-wide mt-1">
            {country}
          </p>
        </div>
      </div>
    </div>
  );
}

