
import WeatherCard from "@/components/WeatherCard";
import useGetWeather from "@/hooks/useGetWeather";
import MainLayout from "@/layouts/MainLayout";
import { useState } from "react";

const HomePage = () => {
  const [city, setCity] = useState<string>("england");
  const {weather} = useGetWeather(city);

const onAddCity = (newCity: string) => {
    setCity(newCity);
  };


  return (
    <>
      <MainLayout onAddCity={onAddCity}  weather={weather}>
        <WeatherCard city={city} />
      </MainLayout>
    </>
  );
};

export default HomePage;
