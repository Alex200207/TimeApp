import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Cloud,
  Droplets,
  Eye,
  Sunrise,
  Sunset,
  Thermometer,
  Wind,
} from "lucide-react";
import useGetWeather from "@/hooks/useGetWeather";
import { useFavorites } from "@/contexts/FavoritesContext";
import { City, WeatherApiResponse } from "@/types";
import { getWeatherColor } from "../utils/getWeatherColor";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";

interface WeatherCardProps {
  city: City;
  weather: WeatherApiResponse | null;
}

const WeatherCard = ({ city }: WeatherCardProps) => {
  const { weather } = useGetWeather(city);
  const [colors, setColors] = useState(getWeatherColor(weather));
  const [currentTime, setCurrentTime] = useState("");
  const { toggleFavorite, favorites } = useFavorites();

  useEffect(() => {
    if (weather) {
      setColors(getWeatherColor(weather));

      const calculateLocalTime = () => {
        const now = new Date();
        const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
        const localTime = new Date(utcTime + (weather.timezone || 0) * 1000);
        return localTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
      };

      setCurrentTime(calculateLocalTime());

      const interval = setInterval(() => {
        setCurrentTime(calculateLocalTime());
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [weather]);

  const WeatherInfo = ({
    icon: Icon,
    label,
    value,
  }: {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    value: string | number;
  }) => (
    <div className={`flex items-center gap-2 ${colors.text}`}>
      <Icon className={`w-4 h-4 ${colors.icon}`} />
      <span className="text-sm">{label}:</span>
      {weather ? (
        <span className="text-sm font-medium">{value}</span>
      ) : (
        <Skeleton className="h-4 w-12" />
      )}
    </div>
  );

  return (
    <div className="flex justify-center items-center p-2">
      <Card
        className={`w-[380px] overflow-hidden ${colors.cardBg} backdrop-blur-sm border ${colors.border}`}
      >
        <CardHeader className="pb-2 space-y-4">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {weather ? (
                    <div className="flex items-center gap-2">
                      <CardTitle
                        className={`text-3xl font-bold ${colors.title}`}
                      >
                        {weather?.name}, {weather?.sys.country}
                      </CardTitle>
                      <button
                        onClick={() => toggleFavorite?.(city)}
                        className="mt-2 focus:outline-none"
                        aria-label={favorites ? "remover" : "agregar"}
                      >
                        <FaHeart
                          className={`w-5 h-5 transition-colors ${
                            favorites
                              ? "text-red-500 fill-red-500"
                              : `text-slate-900 hover:text-red-500`
                          }`}
                        />
                      </button>
                    </div>
                  ) : (
                    <Skeleton className="h-8 w-48 mb-2" />
                  )}

                  {weather ? (
                    <CardDescription
                      className={`text-lg font-medium ${colors.description} capitalize`}
                    >
                      {weather?.weather[0].description}
                    </CardDescription>
                  ) : (
                    <Skeleton className="h-6 w-32" />
                  )}
                </div>
                {weather ? (
                  <img
                    src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`}
                    alt={weather?.weather[0].description}
                    width={80}
                    height={80}
                    className="transform -translate-y-2"
                  />
                ) : (
                  <Skeleton className="h-20 w-20 rounded-full" />
                )}
              </div>
            </div>
          </div>

          <div className="flex items-end gap-4">
            {weather ? (
              <>
                <span className={`text-5xl font-bold ${colors.title}`}>
                  {Math.round(weather?.main.temp || 0)}°C
                </span>
                <span className={`text-lg ${colors.description} pb-1`}>
                  Sensación {Math.round(weather?.main.feels_like || 0)}°C
                </span>
              </>
            ) : (
              <div className="flex gap-4">
                <Skeleton className="h-12 w-24" />
                <Skeleton className="h-6 w-32 self-end mb-1" />
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3 py-4">
            <WeatherInfo
              icon={Droplets}
              label="Humedad"
              value={`${weather?.main.humidity}%`}
            />
            <WeatherInfo
              icon={Wind}
              label="Viento"
              value={`${weather?.wind.speed} m/s`}
            />
            <WeatherInfo
              icon={Eye}
              label="Visibilidad"
              value={`${
                weather?.visibility
                  ? (weather.visibility / 1000).toFixed(1)
                  : "N/A"
              } km`}
            />
            <WeatherInfo
              icon={Thermometer}
              label="Máxima"
              value={`${Math.round(weather?.main.temp_max || 0)}°C`}
            />
            <WeatherInfo
              icon={Thermometer}
              label="Presión"
              value={`${weather?.main.pressure} hPa`}
            />
            <WeatherInfo
              icon={Cloud}
              label="Nubes"
              value={`${weather?.clouds.all}%`}
            />
          </div>

          <div className={`border-t ${colors.border} pt-4`}>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center">
                <Sunrise className={`w-6 h-6 text-orange-400 mb-1`} />
                <span className={colors.text}>Amanecer</span>
                {weather ? (
                  <span className={`text-sm font-medium ${colors.title}`}>
                    {weather?.sys.sunrise
                      ? new Date(weather.sys.sunrise * 1000).toLocaleTimeString(
                          [],
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )
                      : "N/A"}
                  </span>
                ) : (
                  <Skeleton className="h-4 w-16 mt-1" />
                )}
              </div>
              <div className="flex flex-col items-center">
                <Sunset className={`w-6 h-6 text-orange-400 mb-1`} />
                <span className={colors.text}>Atardecer</span>
                {weather ? (
                  <span className={`text-sm font-medium ${colors.title}`}>
                    {weather?.sys.sunset
                      ? new Date(weather.sys.sunset * 1000).toLocaleTimeString(
                          [],
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )
                      : "N/A"}
                  </span>
                ) : (
                  <Skeleton className="h-4 w-16 mt-1" />
                )}
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className={`${colors.footerBg} py-3`}>
          {weather ? (
            <p className={`text-xl ${colors.text} w-full text-center`}>
              Hora actual: {currentTime}
            </p>
          ) : (
            <Skeleton className="h-4 w-32 mx-auto" />
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default WeatherCard;
