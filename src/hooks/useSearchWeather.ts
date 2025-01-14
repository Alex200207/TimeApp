import { API_KEY, API_URL_GEO } from "@/constants/api";
import { City } from "@/types";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";

interface SearchWeatherProps {
  onAddCity: (newCity: City) => void;
}

export const useSearchWeather = ({ onAddCity }: SearchWeatherProps) => {
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
          `${API_URL_GEO}q=${inputValue}&limit=5&appid=${API_KEY}`
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

  return {
    inputValue,
    cities,
    loading,
    colors,
    onInputChange,
    handleCitySelect,
  };
};
