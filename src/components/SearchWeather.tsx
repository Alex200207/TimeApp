import { useSearchWeather } from "@/hooks/useSearchWeather";
import { Input } from "./ui/input";
import { City } from "@/types";
import { useEffect, useState } from "react";
import { getWeatherColor } from "@/utils/getWeatherColor";
import useGetWeather from "@/hooks/useGetWeather";

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

  const backgroundColor = weather ? colors.cardBg : "bg-gray-800";

  return (
    <div className="relative">
      <Input
        type="text"
        placeholder="Buscar ciudad"
        value={inputValue}
        onChange={onInputChange}
        className={`w-full p-2 ${backgroundColor} opacity-100 ${colors.title} focus:outline-none placeholder:text-slate-50 `}
      />
      {inputValue.length >= 3 && (
        <div
          className={`absolute w-full mt-1 bg-slate-50 border rounded-md shadow-lg z-10`}
        >
          {loading ? (
            <div className={`p-2 ${colors.text}`}>Loading...</div>
          ) : cities.length > 0 ? (
            cities.map((city, index) => (
              <div
                key={`${city.name}-${city.country}-${index}`}
                className="p-5 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleCitySelect(city)}
              >
                {city.name}, {city.country} , {city.state}
              </div>
            ))
          ) : (
            <div className="p-2 text-gray-500">Sin resultado por aquí</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchWeather;
