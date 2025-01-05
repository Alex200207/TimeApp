import { useState, useEffect } from "react";
import { getWeather } from "@/helpers/getWeather";
import { WeatherApiResponse } from "@/types";

const useGetWeather = (city: string) => {
  const [weather, setWeather] = useState<WeatherApiResponse | null>(null);



  const fetchWeather = async (city: string) => {
    try {
      const data = await getWeather(city);
      setWeather(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };
  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  return {
    weather,
  };
};

export default useGetWeather;
