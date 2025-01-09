import { ChangeEvent, useState, useEffect } from "react";
import { Input } from "./ui/input";
import axios from "axios";
import { City } from "@/types";

const API_KEY = "cd0fff38e7266bc916f27925c6ba95b2";

interface SearchWeatherProps {
  onAddCity: (newCity: City) => void;
}

const SearchWeather = ({ onAddCity }: SearchWeatherProps) => {
  const [inputValue, setInputValue] = useState("");
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);

  const hour = new Date().getHours();
  const isDaytime = hour >= 6 && hour < 18;

  // Obtener las clases de color basadas en el momento del día
  const getColorClasses = () => {
    if (isDaytime) {
      return {
        background: "bg-white/10",
        text: "text-gray-900",
        accent: "text-blue-600",
        border: "border-white/20",
        shadow: "shadow-light",
      };
    } else {
      return {
        background: "bg-black/20",
        text: "text-white",
        accent: "text-blue-300",
        border: "border-white/10",
        shadow: "shadow-dark",
      };
    }
  };

  const colors = getColorClasses();

  useEffect(() => {
    const fetchCities = async () => {
      if (inputValue.length < 3) {
        setCities([]);
        return;
      }

      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/geo/1.0/direct?q=${inputValue}&limit=5&appid=${API_KEY}`
        );
        const data = response.data;
        setCities(data);
      } catch (error) {
        console.error("Error fetching cities:", error);
        setCities([]);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchCities, 300);
    return () => clearTimeout(debounceTimer);
  }, [inputValue]);

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleCitySelect = (selectedCity: City) => {
    const cleanCityName = selectedCity.name.replace(/\(.*\)/, "").trim(); // Eliminar el texto entre paréntesis y los espacios adicionales
    onAddCity({ name: cleanCityName, country: selectedCity.country });
    setInputValue("");
    setCities([]);
  };

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
                className="p-2 hover:bg-gray-100 cursor-pointer"
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
