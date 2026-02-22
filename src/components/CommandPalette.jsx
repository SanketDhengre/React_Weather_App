import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { useWeatherStore } from "../store/useWeatherStore";
import { Search, MapPin, Settings2 } from "lucide-react";
import { cn } from "../lib/utils";

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { setQuery, setUnits } = useWeatherStore();

  useEffect(() => {
    const down = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelectCity = (city) => {
    setQuery({ q: city });
    setOpen(false);
    setSearch("");
  };

  const handleSelectUnit = (unit) => {
    setUnits(unit);
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] bg-black/40 backdrop-blur-sm">
      <div className="fixed inset-0" onClick={() => setOpen(false)} />
      <Command 
        className="relative z-50 w-full max-w-lg overflow-hidden rounded-2xl glass-panel shadow-2xl border border-white/20"
        onKeyDown={(e) => {
          if (e.key === "Escape") setOpen(false);
        }}
      >
        <div className="flex items-center px-4 py-3 border-b border-white/10">
          <Search className="w-5 h-5 text-white/50 mr-3" />
          <Command.Input
            autoFocus
            value={search}
            onValueChange={setSearch}
            className="flex-1 bg-transparent text-white placeholder:text-white/40 focus:outline-none text-lg"
            placeholder="Type a command or search a city..."
          />
        </div>
        <Command.List className="max-h-[300px] overflow-y-auto p-2 scrollbar-none">
          <Command.Empty className="p-4 text-center text-sm text-white/50">
            No results found.
          </Command.Empty>
          
          <Command.Group heading="Top Cities" className="text-xs font-medium text-white/40 px-2 py-2">
            {["London", "Tokyo", "New York", "Paris", "Sydney", "Dubai", "Singapore"].map((city) => (
              <Command.Item
                key={city}
                onSelect={() => handleSelectCity(city)}
                className={cn(
                  "flex items-center px-3 py-2.5 mt-1 rounded-lg cursor-pointer text-sm text-white/90 transition-colors",
                  "hover:bg-white/10 aria-selected:bg-white/10"
                )}
              >
                <MapPin className="w-4 h-4 mr-3 text-white/50" />
                {city}
              </Command.Item>
            ))}
          </Command.Group>
          
          <Command.Group heading="Settings" className="text-xs font-medium text-white/40 px-2 py-2 border-t border-white/10 mt-2">
            <Command.Item
              onSelect={() => handleSelectUnit("metric")}
              className={cn(
                "flex items-center px-3 py-2.5 mt-1 rounded-lg cursor-pointer text-sm text-white/90 transition-colors",
                "hover:bg-white/10 aria-selected:bg-white/10"
              )}
            >
              <Settings2 className="w-4 h-4 mr-3 text-white/50" />
              Switch to Celsius (°C)
            </Command.Item>
            <Command.Item
              onSelect={() => handleSelectUnit("imperial")}
              className={cn(
                "flex items-center px-3 py-2.5 mt-1 rounded-lg cursor-pointer text-sm text-white/90 transition-colors",
                "hover:bg-white/10 aria-selected:bg-white/10"
              )}
            >
              <Settings2 className="w-4 h-4 mr-3 text-white/50" />
              Switch to Fahrenheit (°F)
            </Command.Item>
          </Command.Group>
        </Command.List>
      </Command>
    </div>
  );
}
