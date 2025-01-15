import WeatherCard from "@/components/WeatherCard";
import MainLayout from "@/layouts/MainLayout";
import WeatherForecast from "@/components/WeatherForecast";
import { useAddWeather } from "@/hooks/useAddWeather";
// import { useGetPronostico } from "@/hooks/useGetPronostico";

const HomePage = () => {
  const { city, weather, onAddCity } = useAddWeather();

  return (
    <MainLayout onAddCity={onAddCity} weather={weather} city={city}>
      <WeatherCard city={city} weather={weather} />
      <WeatherForecast city={city} />
    </MainLayout>
  );
};

export default HomePage;
