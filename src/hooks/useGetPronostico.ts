import { useEffect, useState, useCallback } from "react";
import { getPronostico } from "@/helpers/getWeather";
import { City, WeatherForecastItem } from "@/types";


interface GetPronostico {
    city: City;
}

export const useGetPronostico = ({city}:GetPronostico) => {
  const [pronostico, setPronostico] = useState<WeatherForecastItem[]>([]);
  const [loading, setLoading] = useState(true);


  const fetchPronostico = useCallback(async (city: City) => {
    try {
      const data = await getPronostico(city);
      setPronostico(filterPronostico(data));
      setLoading(false);
    } catch (error) {
      console.error("error al obtener los datos:", error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPronostico(city); 
  }, [city, fetchPronostico]);

  const filterPronostico = (pronostico: WeatherForecastItem[]) => {
    return pronostico.filter((item) => {
      const date = new Date(item.dt * 1000);
      return date.getHours() === 12;
    });
  };

  const getDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString("es-ES", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };


  return {
    pronostico,
    loading,
    setLoading,
    getDate,
  };
};
