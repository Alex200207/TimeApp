import {Card,CardContent,CardDescription, CardFooter,CardHeader,CardTitle,} from "@/components/ui/card";
import {Cloud,Droplets,Eye,Sunrise,Sunset,Thermometer,Wind,} from "lucide-react";
import useGetWeather from "@/hooks/useGetWeather";

interface WeatherCardProps {
  city: string;
}
const WeatherCard = ({ city }: WeatherCardProps) => {
  const { weather } = useGetWeather(city);

  const WeatherInfo = ({icon: Icon,label,value}: {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    value: string | number;
  }) => (
    <div className="flex items-center gap-2 text-gray-700">
      <Icon className="w-4 h-4 text-blue-500" />
      <span className="text-sm">{label}:</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );

  return (
    <div className="flex justify-center items-center p-2 ">
      <Card className="w-[380px] overflow-hidden bg-white bg-opacity-10 backdrop-blur-xl border-none">
        <CardHeader className="pb-2 space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-3xl font-bold text-blue-900">
                {weather?.name}
              </CardTitle>
              <CardDescription className="text-lg font-medium text-blue-600 capitalize">
                {weather?.weather[0].description}
              </CardDescription>
            </div>
            <img
              src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`}
              alt={weather?.weather[0].description}
              width={80}
              height={80}
              className="transform -translate-y-2"
            />
          </div>
          <div className="flex items-end gap-4">
            <span className="text-5xl font-bold text-blue-900">
              {Math.round(weather?.main.temp || 0)}°C
            </span>
            <span className="text-lg text-blue-700 pb-1">
              Sensación {Math.round(weather?.main.feels_like || 0)}°C
            </span>
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
              label="Presión"
              value={`${weather?.main.pressure} hPa`}
            />
            <WeatherInfo
              icon={Cloud}
              label="Nubes"
              value={`${weather?.clouds.all}%`}
            />
          </div>

          <div className="border-t border-blue-100 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center">
                <Sunrise className="w-6 h-6 text-orange-500 mb-1" />
                <span className="text-sm text-gray-600">Amanecer</span>
                <span className="text-sm font-medium text-gray-800">
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
              </div>
              <div className="flex flex-col items-center">
                <Sunset className="w-6 h-6 text-orange-500 mb-1" />
                <span className="text-sm text-gray-600">Atardecer</span>
                <span className="text-sm font-medium text-gray-800">
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
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="bg-gradient-to-r from-blue-50 to-blue-100 py-3 border-none" >
          <p className="text-xs text-blue-600 w-full text-center">
            Última actualización:{" "}
            {new Date((weather?.dt ?? 0) * 1000).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default WeatherCard;
