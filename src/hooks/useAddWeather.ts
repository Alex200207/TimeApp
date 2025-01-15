import { useEffect, useState } from "react";
import useGetWeather from "./useGetWeather";
import { City } from "@/types";
import { API_KEY, API_URL } from "@/constants/api";

export const useAddWeather = () => {
  const [city, setCity] = useState<City>({ name: "jalapa", country: "NI" });
  const { weather } = useGetWeather(city);

  useEffect(() => {
    getCityFromGeolocation();
  }, []);


  //esta funcion se encarga de obtener la ciudad a partir de la geolocalizacion del usuario
  const getCityFromGeolocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async ({ coords }) => {
        try {
          const res = await fetch(
            `${API_URL}lat=${coords.latitude}&lon=${coords.longitude}&appid=${API_KEY}`
          );
          const data = await res.json();
          setCity({ name: data.name, country: data.sys.country });
        } catch (error) {
          console.error("Error fetching city:", error);
          setCity({ name: "Jalapa", country: "NI" });
        }
      });
    }
  };

  const onAddCity = (newCity: City) => {
    setCity(newCity);
  };

  return {
    city,
    weather,
    onAddCity,
  };
};
