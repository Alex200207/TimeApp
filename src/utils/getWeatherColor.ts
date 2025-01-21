import { SysData } from "@/types";

interface WeatherColorClasses {
  title: string;
  description: string;
  text: string;
  icon: string;
  border: string;
  cardBg: string;
  footerBg: string;
  searchText?: string;
}

export const getWeatherColor = (
  weather: {
    sys: SysData;
    weather: { main: string }[];
  } | null
): WeatherColorClasses => {
  if (!weather) {
    return {
      title: "text-gray-700",
      description: "text-gray-600",
      text: "text-gray-500",
      icon: "text-gray-400",
      border: "border-gray-300",
      cardBg: "bg-white",
      footerBg: "bg-gray-100",
    };
  }

  const currentTime = Date.now() / 1000; // Convierte a segundos (UNIX timestamp)
  const sunrise = weather.sys.sunrise; // Hora del amanecer desde la API
  const sunset = weather.sys.sunset; // Hora del atardecer desde la API

  const isDaytime = currentTime >= sunrise && currentTime < sunset;

  const condition = weather?.weather[0].main.toLowerCase() || "clear";

  const baseTextColor = isDaytime ? "text-gray-700" : "text-gray-200";
  const secondaryTextColor = isDaytime ? "text-gray-700" : "text-gray-200";
  const mutedTextColor = isDaytime ? "text-gray-600" : "text-gray-300";
  const iconColor = isDaytime ? "text-blue-600" : "text-blue-300";
  const borderColor = isDaytime ? "border-white/20" : "border-white/10";
  const searchText = isDaytime ? "text-white" : "text-black";

  switch (condition) {
    case "clear":
      return {
        title: baseTextColor,
        description: secondaryTextColor,
        text: mutedTextColor,
        icon: iconColor,
        border: borderColor,
        cardBg: "bg-white/10",
        searchText: searchText,
        footerBg: isDaytime ? "bg-white/20" : "bg-black/20",
      };
    case "clouds":
      return {
        title: baseTextColor,
        description: secondaryTextColor,
        text: mutedTextColor,
        icon: iconColor,
        border: borderColor,
        cardBg: "bg-white/10",
        searchText: searchText,
        footerBg: isDaytime ? "bg-white/20" : "bg-black/20",
      };
    case "rain":
      return {
        title: "text-white",
        description: "text-blue-200",
        text: "text-gray-200",
        icon: "text-blue-300",
        border: "border-white/10",
        cardBg: "bg-black/20",
        searchText: searchText,
        footerBg: "bg-black/30",
      };
    case "snow":
      return {
        title: "text-white",
        description: "text-gray-200",
        text: "text-gray-300",
        icon: "text-blue-300",
        border: "border-white/10",
        cardBg: "bg-black/20",
        footerBg: "bg-black/30",
        searchText: searchText,
      };
    case "thunderstorm":
      return {
        title: "text-white",
        description: "text-purple-200",
        text: "text-gray-200",
        icon: "text-purple-300",
        border: "border-white/10",
        cardBg: "bg-black/30",
        searchText: searchText,
        footerBg: "bg-black/40",
      };
    default:
      return {
        title: baseTextColor,
        description: secondaryTextColor,
        text: mutedTextColor,
        icon: iconColor,
        border: borderColor,
        cardBg: "bg-white/10",
        searchText: searchText,
        footerBg: isDaytime ? "bg-white/20" : "bg-black/20",
      };
  }
};
