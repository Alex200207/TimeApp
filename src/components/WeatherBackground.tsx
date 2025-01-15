import { FC } from "react";
import { WeatherApiResponse } from "@/types";
import {
  Sun,
  Moon,
  Star,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudFog,
} from "lucide-react";

interface WeatherBackgroundProps {
  weather: WeatherApiResponse | null;
}

const WeatherBackground: FC<WeatherBackgroundProps> = ({ weather }) => {
  if (!weather) return null;

  // desempaquetando valores de la respuesta de la API
  const { sunrise, sunset } = weather.sys;

  // calculo de la hora actual en segundos con funcion incoporada de Date
  const currentTime = Math.floor(Date.now() / 1000);

  // dermine si es de dia o noche ,,,
  const isDaytime = currentTime >= sunrise && currentTime < sunset;

  const condition = weather.weather[0].main.toLowerCase();

  const getBackgroundStyle = () => {
    const baseStyle = isDaytime
      ? "bg-gradient-to-b from-sky-400 via-blue-300 to-blue-400"
      : "bg-gradient-to-b from-blue-900 via-indigo-900 to-purple-900";

    switch (condition) {
      case "clear":
        return baseStyle;
      case "clouds":
        return isDaytime
          ? "bg-gradient-to-b from-gray-300 via-blue-200 to-gray-300"
          : "bg-gradient-to-b from-gray-900 via-indigo-900 to-gray-800";
      case "rain":
        return isDaytime
          ? "bg-gradient-to-b from-gray-400 via-blue-300 to-gray-500"
          : "bg-gradient-to-b from-gray-800 via-indigo-900 to-gray-900";
      case "snow":
        return isDaytime
          ? "bg-gradient-to-b from-gray-100 via-blue-50 to-white"
          : "bg-gradient-to-b from-gray-800 via-blue-900 to-gray-900";
      case "thunderstorm":
        return "bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900";
      case "fog":
      case "mist":
        return isDaytime
          ? "bg-gradient-to-b from-gray-300 via-gray-200 to-gray-300"
          : "bg-gradient-to-b from-gray-800 via-gray-700 to-gray-800";
      default:
        return baseStyle;
    }
  };

  const TimeIcon = isDaytime ? Sun : Moon;

  return (
    <div
      className={`absolute inset-0 -z-10 overflow-hidden ${getBackgroundStyle()} transition-all duration-1000`}
    >
      {/* Main celestial body (sun/moon) */}
      <div
        className={`absolute ${
          isDaytime ? "top-10 right-20" : "top-20 right-20"
        } transition-all duration-1000`}
      >
        <TimeIcon
          className={`w-40 h-40 ${
            isDaytime ? "text-yellow-200 animate-spin-slow" : "text-gray-100"
          }`}
          style={{ animationDuration: "120s" }}
        />
        <div
          className={`absolute inset-0 blur-xl ${
            isDaytime ? "bg-yellow-200/30" : "bg-gray-100/10"
          }`}
        />
      </div>

      {/* busque ayuda para estp*/}
      {!isDaytime && (
        <div className="absolute inset-0">
          {Array(50)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="absolute"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `twinkle ${2 + Math.random() * 3}s infinite ${
                    Math.random() * 2
                  }s`,
                }}
              >
                <Star className="w-2 h-2 text-white/70" />
              </div>
            ))}
        </div>
      )}

      <div className="absolute inset-0 grid grid-cols-8 md:grid-cols-12 gap-8 p-8">
        {Array(24)
          .fill(0)
          .map((_, i) => {
            const WeatherIcon = (() => {
              switch (condition) {
                case "clear":
                  return isDaytime ? Sun : Moon;
                case "clouds":
                  return Cloud;
                case "rain":
                  return CloudRain;
                case "snow":
                  return CloudSnow;
                case "thunderstorm":
                  return CloudLightning;
                case "fog":
                case "mist":
                  return CloudFog;
                default:
                  return isDaytime ? Sun : Moon;
              }
            })();

            return (
              <div
                key={i}
                className={`transform transition-all duration-1000 ${
                  isDaytime ? "opacity-20" : "opacity-10"
                }`}
                style={{
                  animation: `float ${3 + Math.random() * 2}s infinite ${
                    i * 0.2
                  }s`,
                  transform: `translateY(${Math.sin(i) * 10}px)`,
                }}
              >
                <WeatherIcon className="w-8 h-8" />
              </div>
            );
          })}
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
    </div>
  );
};

export default WeatherBackground;
