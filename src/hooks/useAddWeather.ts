import { useEffect, useState } from "react";
import useGetWeather from "./useGetWeather";
import { City } from "@/types";
import { API_KEY, API_URL } from "@/constants/api";

export const useAddWeather = () => {
  const [city, setCity] = useState<City>({ name: "ocotal", country: "NI" });
  const { weather } = useGetWeather(city);
  const [favorites, setFavorites] = useState([
    { name: "Managua", country: "NI" },
    { name: "Matagalpa", country: "NI" },
    { name: "León", country: "NI" },
  ]);



  useEffect(() => {
    
    getCityFromGeolocation();
    const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(storedFavorites);
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

  const onAddCity = (newCity: City) => {
    setCity(newCity);
  };

  const toggleFavorite = (weathers: City) => {
    setFavorites((prevFavorites) =>
      prevFavorites.some((fav) => fav.name === weathers.name)
        ? prevFavorites.filter((fav) => fav.name !== weathers.name)
        : [...prevFavorites, weathers]
    );
  };

  

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  return {
    city,
    weather,
    onAddCity,
    delay,
    favorites,
    toggleFavorite,
  };
};
