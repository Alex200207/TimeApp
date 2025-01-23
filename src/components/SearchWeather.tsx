import { useSearchWeather } from "@/hooks/useSearchWeather";
import { Input } from "./ui/input";
import { City } from "@/types";
import { Loader2, MapPin } from "lucide-react";

interface SearchWeatherProps {
  onAddCity: (newCity: City) => void;
  city: City;
}

const SearchWeather = ({ onAddCity }: SearchWeatherProps) => {
  const { inputValue, onInputChange, cities, loading, handleCitySelect } =
    useSearchWeather({ onAddCity });

  return (
    <div className="relative w-full max-w-[280px] sm:max-w-[280px] mx-auto sm:mx-0">
      <Input
        type="text"
        placeholder="Buscar ciudad..."
        value={inputValue}
        onChange={onInputChange}
        className="w-full bg-slate-800/20 border-0 text-white placeholder:text-white/50 focus-visible:ring-1 focus-visible:ring-white/30"
      />
      
      {loading && (
        <div className="absolute right-2 top-1/2 -translate-y-1/2">
          <Loader2 className="w-4 h-4 animate-spin text-white/70" />
        </div>
      )}

      {inputValue.length >= 3 && (
        <div className="absolute w-full mt-1 bg-slate-800/95 backdrop-blur-sm rounded-lg border border-white/10 shadow-xl z-50">
          {loading ? (
            <div className="p-2 text-sm text-white/70 text-center">
              Buscando...
            </div>
          ) : cities.length > 0 ? (
            <div className="py-1 max-h-[240px] overflow-y-auto">
              {cities.map((city, index) => (
                <div
                  key={`${city.name}-${city.country}-${index}`}
                  onClick={() => handleCitySelect(city)}
                  className="flex items-center gap-2 px-2 py-1.5 hover:bg-white/5 cursor-pointer group"
                >
                  <MapPin className="w-3.5 h-3.5 text-white/50 group-hover:text-white/70 flex-shrink-0" />
                  <div className="min-w-0 text-sm">
                    <div className="text-white truncate">{city.name}</div>
                    <div className="text-white/50 text-xs truncate">
                      {[city.state, city.country].filter(Boolean).join(", ")}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-2 text-sm text-white/50 text-center">
              No se encontraron resultados
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchWeather;