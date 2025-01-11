import WeatherCard from "@/components/WeatherCard";
import useGetWeather from "@/hooks/useGetWeather";
import MainLayout from "@/layouts/MainLayout";
import { useState, useEffect } from "react";
import { City } from "@/types";
import { API_KEY, API_URL } from "@/constants/api";

const HomePage = () => {
  const [city, setCity] = useState<City>({ name: "Jalapa", country: "NI" });
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

  return (
    <MainLayout onAddCity={onAddCity} weather={weather}>
      <WeatherCard city={city} weather={weather} />
    </MainLayout>
  );
};

export default HomePage;
