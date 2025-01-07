import WeatherCard from "@/components/WeatherCard";
import useGetWeather from "@/hooks/useGetWeather";
import MainLayout from "@/layouts/MainLayout";
import { useState } from "react";
import { City } from "@/types";

const HomePage = () => {
  const [city, setCity] = useState<City>({ name: "Jalapa", country: "NI" });
  const { weather } = useGetWeather(city);

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
