import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { City, WeatherApiResponse } from "@/types";

interface WeatherCardProps {
  city: City;
  weather: WeatherApiResponse | null;
}

const WeatherCard = ({ city }: WeatherCardProps) => {
  const { weather } = useGetWeather(city);
  const hour = new Date().getHours();
  const isDaytime = hour >= 6 && hour < 18;
  const condition = weather?.weather[0].main.toLowerCase() || 'clear';

  // Función para determinar las clases de color basadas en el momento del día y el clima
  const getColorClasses = () => {
    const baseTextColor = isDaytime ? 'text-gray-900' : 'text-white';
    const secondaryTextColor = isDaytime ? 'text-gray-700' : 'text-gray-200';
    const mutedTextColor = isDaytime ? 'text-gray-600' : 'text-gray-300';
    const iconColor = isDaytime ? 'text-blue-600' : 'text-blue-300';
    const borderColor = isDaytime ? 'border-white/20' : 'border-white/10';
    
    switch (condition) {
      case 'clear':
        return {
          title: baseTextColor,
          description: secondaryTextColor,
          text: mutedTextColor,
          icon: iconColor,
          border: borderColor,
          cardBg: 'bg-white/10',
          footerBg: isDaytime ? 'bg-white/20' : 'bg-black/20'
        };
      case 'clouds':
      case 'rain':
      case 'snow':
        return {
          title: 'text-white',
          description: 'text-gray-200',
          text: 'text-gray-300',
          icon: 'text-blue-300',
          border: 'border-white/10',
          cardBg: 'bg-black/20',
          footerBg: 'bg-black/30'
        };
      case 'thunderstorm':
        return {
          title: 'text-white',
          description: 'text-purple-200',
          text: 'text-gray-200',
          icon: 'text-purple-300',
          border: 'border-white/10',
          cardBg: 'bg-black/30',
          footerBg: 'bg-black/40'
        };
      default:
        return {
          title: baseTextColor,
          description: secondaryTextColor,
          text: mutedTextColor,
          icon: iconColor,
          border: borderColor,
          cardBg: 'bg-white/10',
          footerBg: isDaytime ? 'bg-white/20' : 'bg-black/20'
        };
    }
  };

  const colors = getColorClasses();

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
      <span className="text-sm font-medium">{value}</span>
    </div>
  );

  return (
    <div className="flex justify-center items-center p-2">
      <Card className={`w-[380px] overflow-hidden ${colors.cardBg} backdrop-blur-sm border ${colors.border}`}>
        <CardHeader className="pb-2 space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className={`text-3xl font-bold ${colors.title}`}>
                {weather?.name}, {weather?.sys.country}
              </CardTitle>
              <CardDescription className={`text-lg font-medium ${colors.description} capitalize`}>
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
            <span className={`text-5xl font-bold ${colors.title}`}>
              {Math.round(weather?.main.temp || 0)}°C
            </span>
            <span className={`text-lg ${colors.description} pb-1`}>
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
              </div>
              <div className="flex flex-col items-center">
                <Sunset className={`w-6 h-6 text-orange-400 mb-1`} />
                <span className={colors.text}>Atardecer</span>
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
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className={`${colors.footerBg} py-3`}>
          <p className={`text-xs ${colors.text} w-full text-center`}>
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