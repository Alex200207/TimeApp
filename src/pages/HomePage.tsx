
import WeatherCard from "@/components/WeatherCard";
import MainLayout from "@/layouts/MainLayout";
import { useState } from "react";

const HomePage = () => {
  const [city, setCity] = useState<string>("Nicaragua");

const onAddCity = (newCity: string) => {
    setCity(newCity);
  };


  return (
    <>
      <MainLayout onAddCity={onAddCity}>
        <WeatherCard city={city} />
      </MainLayout>
    </>
  );
};

export default HomePage;
