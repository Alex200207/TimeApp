import { useEffect, useState } from "react";
import useGetWeather from "./useGetWeather";
import { City } from "@/types";
import { API_KEY, API_URL } from "@/constants/api";

export const useAddWeather = (
  initialCity: City = { name: "ocotal", country: "NI" }
) => {
  const [city, setCity] = useState<City>({
    name: initialCity.name,
    country: initialCity.country,
  });
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
          setCity(city);
        }
      });
    }
  };

  //temas a tener en cuenta
  //navigator es un objeto global que se utiliza para obtener la geolocalizacion del usuario
  //geoLocation es un objeto que contiene la latitud y longitud del usuario
  //getCurrentPosition es un metodo que se encarga de obtener la posicion actual del usuario

  const onAddCity = (newCity: City) => {
    setCity(newCity);
  };

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  return {
    city,
    setCity,
    weather,
    onAddCity,
    delay,
  };
};
