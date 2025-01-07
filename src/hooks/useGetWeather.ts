import { useState, useEffect } from "react";
import { getWeather } from "@/helpers/getWeather";
import { WeatherApiResponse } from "@/types";
import { City } from "@/types";

const useGetWeather = (city: City) => {
  const [weather, setWeather] = useState<WeatherApiResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchWeather = async (city: City) => {
    try {
      const data = await getWeather(city);
      setWeather(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const setLoadingFalse = () => {
    setLoading(false);
  };

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  return {
    weather,
    loading,
    setLoadingFalse,
  };
};

export default useGetWeather;
