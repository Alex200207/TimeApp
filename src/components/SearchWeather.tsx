import { useSearchWeather } from "@/hooks/useSearchWeather";
import { Input } from "./ui/input";
import { City } from "@/types";

interface SearchWeatherProps {
  onAddCity: (newCity: City) => void;
}

const SearchWeather = ({ onAddCity }: SearchWeatherProps) => {
  const {
    inputValue,
    onInputChange,
    cities,
    loading,
    handleCitySelect,
    colors,
  } = useSearchWeather({ onAddCity });

  return (
    <div className="relative">
      <Input
        type="text"
        placeholder="Search for a city"
        value={inputValue}
        onChange={onInputChange}
        className={`w-full p-2 bg-transparent  ${colors.text} focus:outline-none placeholder:${colors.text}`}
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
