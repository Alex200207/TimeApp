import { useEffect, useState, useCallback } from "react";
import { getPronostico } from "@/helpers/getWeather";
import { WeatherForecastItem } from "@/types";

export const useGetPronostico = () => {
  const [pronostico, setPronostico] = useState<WeatherForecastItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPronostico = useCallback(async () => {
    try {
      const data = await getPronostico();
      setPronostico(filterPronostico(data));
      setLoading(false);
    } catch (error) {
      console.error("error al obtener los datos:", error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPronostico();
  }, [fetchPronostico]);

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
