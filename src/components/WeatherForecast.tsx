import useGetWeather from "@/hooks/useGetWeather";
import { getWeatherColor } from "@/utils/getWeatherColor";
import { useEffect, useState } from "react";
import { WeatherIcon } from "./WeatherIcon";
import { useGetPronostico } from "@/hooks/useGetPronostico";
import { City } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Cloud,
  CloudRain,
  Sun,
  CloudLightning,
  CloudSnow,
  CloudFog,
} from "lucide-react";

interface WeatherForecastProps {
  city: City;
}

const getWeatherIcon = (condition: string) => {
  switch (condition.toLowerCase()) {
    case "clear":
      return <Sun className="w-6 h-6" />;
    case "rain":
    case "drizzle":
      return <CloudRain className="w-6 h-6" />;
    case "thunderstorm":
      return <CloudLightning className="w-6 h-6" />;
    case "snow":
      return <CloudSnow className="w-6 h-6" />;
    case "mist":
    case "fog":
      return <CloudFog className="w-6 h-6" />;
    default:
      return <Cloud className="w-6 h-6" />;
  }
};

export default function WeatherForecast({ city }: WeatherForecastProps) {
  const { weather } = useGetWeather(city);
  const [colors, setColors] = useState(getWeatherColor(weather));
  const { pronostico, getDate } = useGetPronostico({ city });

  useEffect(() => {
    if (weather) {
      setColors(getWeatherColor(weather));
    }
  }, [weather]);

  return (
    <div className="flex justify-center items-center p-2">
      <div
        className={`w-[380px] mx-auto ${colors.cardBg} rounded-lg shadow-lg p-4`}
      >
        <h2
          className={`text-xl font-semibold ${colors.title} p-2 border-b flex items-center gap-2`}
        >
          {weather && getWeatherIcon(weather.weather[0].main)}
          Pronóstico del Tiempo
        </h2>
        <div className="divide-y">
          {pronostico.length > 0 ? (
            pronostico.map((day, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 transition-colors hover:bg-opacity-10 hover:bg-white cursor-pointer group"
              >
                <div className="w-28">
                  <span className={`${colors.description} font-medium`}>
                    {getDate(day.dt_txt)}
                  </span>
                </div>
                <div className="flex items-center gap-2 min-w-[100px]">
                  <WeatherIcon
                    icon={day.weather[0].icon}
                    description={day.weather[0].description}
                    size="small"
                  />
                  <span className={`${colors.text} text-sm font-semibold`}>
                    {Math.round(day.main.temp_max)}°C /{" "}
                    {Math.round(day.main.temp_min)}°C
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2 flex-1 max-w-[200px]">
                  <span className={`${colors.text} text-sm capitalize`}>
                    {day.weather[0].description}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <>
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4"
                >
                  <div className="w-28">
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <div className="flex items-center gap-2 min-w-[100px]">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <div className="flex items-center justify-between gap-2 flex-1 max-w-[200px]">
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
