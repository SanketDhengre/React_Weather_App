import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Layers } from "lucide-react";

// Fix for default Leaflet markers in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export default function WeatherMap({ weather }) {
  const { lat, lon, name } = weather;
  const API_KEY = "ecc701e123a8c310181923d818958279";
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;

    if (!mapInstanceRef.current) {
      // Initialize map
      mapInstanceRef.current = L.map(mapRef.current, {
        zoomControl: false,
        scrollWheelZoom: false,
      }).setView([lat, lon], 10);

      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://carto.com/">Carto</a>',
      }).addTo(mapInstanceRef.current);

      L.tileLayer(`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${API_KEY}`, {
        opacity: 0.6
      }).addTo(mapInstanceRef.current);
    } else {
      // Update existing map
      mapInstanceRef.current.flyTo([lat, lon], 10, {
        duration: 2,
        easeLinearity: 0.25,
      });
    }

    // Clear old markers before adding a new one
    mapInstanceRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        mapInstanceRef.current.removeLayer(layer);
      }
    });

    L.marker([lat, lon])
      .addTo(mapInstanceRef.current)
      .bindPopup(`<span class="font-semibold text-zinc-900">${name}</span>`);

  }, [lat, lon, name]);

  return (
    <div className="w-full h-full flex flex-col pt-6 bg-white/5 border border-white/10 rounded-3xl glass-panel relative overflow-hidden group">
      <div className="flex items-center text-white/60 mb-4 px-6 relative z-10 w-fit pointer-events-none">
        <Layers className="w-5 h-5 mr-3 text-emerald-400" />
        <span className="font-medium tracking-wide uppercase text-sm">Live Radar</span>
      </div>

      <div className="flex-1 w-full rounded-b-3xl overflow-hidden relative shadow-inner">
        <div ref={mapRef} className="w-full h-full absolute inset-0 z-0 bg-transparent" />
        {/* Bottom Fade Gradient for blend */}
        <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-black/20 to-transparent pointer-events-none z-10" />
      </div>
    </div>
  );
}
