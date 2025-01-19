import { useSearchWeather } from "@/hooks/useSearchWeather";
import { Input } from "./ui/input";
import { City } from "@/types";
import { useEffect, useState } from "react";
import { getWeatherColor } from "@/utils/getWeatherColor";
import useGetWeather from "@/hooks/useGetWeather";
import { Loader2, MapPin } from "lucide-react";

interface SearchWeatherProps {
  onAddCity: (newCity: City) => void;
  city: City;
}

const SearchWeather = ({ onAddCity, city }: SearchWeatherProps) => {
  const { weather } = useGetWeather(city);
  const [colors, setColors] = useState(getWeatherColor(weather));

  useEffect(() => {
    if (weather) {
      setColors(getWeatherColor(weather));
    }
  }, [weather]);

  const { inputValue, onInputChange, cities, loading, handleCitySelect } =
    useSearchWeather({ onAddCity });



  return (
    <div className="relative">
      <div className="relative">
        <Input
          type="text"
          placeholder="Buscar ciudad"
          value={inputValue}
          onChange={onInputChange}
          className={`w-full p-2 pr-10 bg-slate-50 opacity-100 ${colors.title} focus:outline-none focus:border-none placeholder:${colors.title}`}
        />
        {loading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <Loader2 className="w-4 h-4 animate-spin text-slate-50" />
          </div>
        )}
      </div>
      {inputValue.length >= 3 && (
        <div
          className={`absolute w-full mt-1 bg-slate-50 border rounded-md shadow-lg z-10 max-h-[300px] overflow-y-auto`}
        >
          {loading ? (
            <div className="p-4 flex items-center justify-center space-x-2">
              <Loader2 className="w-5 h-5 animate-spin text-gray-500" />
              <span className="text-gray-500">Buscando ciudades...</span>
            </div>
          ) : cities.length > 0 ? (
            cities.map((city, index) => (
              <div
                key={`${city.name}-${city.country}-${index}`}
                className="p-4 hover:bg-gray-100 cursor-pointer transition-colors flex items-center space-x-2"
                onClick={() => handleCitySelect(city)}
              >
                <MapPin className="w-4 h-4 text-gray-500 flex-shrink-0" />
                <div>
                  <div className="font-medium">{city.name}</div>
                  <div className="text-sm text-gray-500">
                    {city.state && `${city.state}, `}
                    {city.country}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-gray-500 text-center">
              No se encontraron resultados
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchWeather;
