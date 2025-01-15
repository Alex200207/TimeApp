
import useGetWeather from "@/hooks/useGetWeather";
import { getWeatherColor } from "@/utils/getWeatherColor";
import { useEffect, useState } from "react";
import { WeatherIcon } from "./WeatherIcon";
import { useGetPronostico } from "@/hooks/useGetPronostico";
import { City } from "@/types";

interface WeatherForecastProps {
  city: City;
}

export default function WeatherForecast({ city }: WeatherForecastProps) {

  const { weather } = useGetWeather(city);
  const [colors, setColors] = useState(getWeatherColor(weather));
  const { pronostico, getDate } = useGetPronostico();

  useEffect(() => {
    if (weather) {
      setColors(getWeatherColor(weather));
    }
  }, [weather]);

 

  return (
    <div className="flex justify-center items-center p-2">
      <div
        className={`w-[380px] : mx-auto ${colors.cardBg} rounded-lg shadow-sm p-2`}
      >
        <h2 className={`text-xl font-semibold ${colors.title}  p-2 border-b`}>
          Pronostico
        </h2>
        <div className="divide-y">
          {pronostico.map((day, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4  transition-colors cursor-pointer group"
            >
              <div className="w-28">
                <span className={`${colors.description}`}>
                  {getDate(day.dt_txt)},{" "}
                </span>
              </div>
              <div className="flex items-center gap-2 min-w-[100px]">
                <WeatherIcon icon={day.icon as "rain" | "cloud" | "sun"} />
                <span className={`${colors.text} text-sm`}>
                  {Math.round(day.main.temp_max)}°C /{" "}
                  {Math.round(day.main.temp_min)}°C
                </span>
              </div>
              <div className="flex items-center justify-between gap-2 flex-1 max-w-[200px]">
                <span className={`${colors.text} text-sm`}>
                  {day.weather[0].description}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
