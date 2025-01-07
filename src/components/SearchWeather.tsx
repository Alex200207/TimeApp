import { ChangeEvent, useState, useEffect } from "react";
import { Input } from "./ui/input";
import axios from "axios";

const API_KEY = "cd0fff38e7266bc916f27925c6ba95b2"; 

interface SearchWeatherProps {
  onAddCity: (newCity: City) => void; 
}

interface City {
  name: string;
  country: string;
}

const SearchWeather = ({ onAddCity }: SearchWeatherProps) => {
  const [inputValue, setInputValue] = useState("");
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);

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
  
    const cleanCityName = selectedCity.name.replace(/\(.*\)/, "").trim();// Eliminar el texto entre paréntesis y los espacios adicionales
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
        className="w-full p-2 bg-transparent text-black focus:outline-none placeholder:text-black"
      />
      {inputValue.length >= 3 && (
        <div className="absolute w-full mt-1 bg-white border rounded-md shadow-lg z-10">
          {loading ? (
            <div className="p-2 text-gray-500">Loading...</div>
          ) : cities.length > 0 ? (
            cities.map((city, index) => (
              <div
                key={`${city.name}-${city.country}-${index}`}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleCitySelect(city)} 
              >
                {city.name}, {city.country}
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
