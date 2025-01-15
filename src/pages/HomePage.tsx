import WeatherCard from "@/components/WeatherCard";
import MainLayout from "@/layouts/MainLayout";
import WeatherForecast from "@/components/WeatherForecast";
import { useAddWeather } from "@/hooks/useAddWeather";
import { LoadingCustom } from "@/components/LoadingCustom";
// import { useGetPronostico } from "@/hooks/useGetPronostico";


const HomePage = () => {
  const { city, weather, onAddCity } = useAddWeather();




  return (
    <>
      {weather ? (
        <MainLayout onAddCity={onAddCity} weather={weather} city={city}>
          <WeatherCard city={city} weather={weather} />
          <WeatherForecast city={city} />
        </MainLayout>
      ) : (
        <MainLayout onAddCity={onAddCity} weather={weather} city={city}>

          <LoadingCustom/>
        </MainLayout>
      )}
    </>
  );
};

export default HomePage;
