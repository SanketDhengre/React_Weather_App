import { create } from "zustand";

export const useWeatherStore = create((set) => ({
  query: { q: "San Francisco" },
  units: "metric",
  weather: null,
  setQuery: (query) => set({ query }),
  setUnits: (units) => set({ units }),
  setWeather: (weather) => set({ weather }),
}));
