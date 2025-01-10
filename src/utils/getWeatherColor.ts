interface WeatherColorClasses {
    title: string;
    description: string;
    text: string;
    icon: string;
    border: string;
    cardBg: string;
    footerBg: string;
  }
  
  export const getWeatherColor = (weather: { weather: { main: string }[] } | null): WeatherColorClasses => {
    const hour = new Date().getHours();
    const isDaytime = hour >= 6 && hour < 18;
    const condition = weather?.weather[0].main.toLowerCase() || "clear";
  
    const baseTextColor = isDaytime ? "text-gray-900" : "text-white";
    const secondaryTextColor = isDaytime ? "text-gray-700" : "text-gray-200";
    const mutedTextColor = isDaytime ? "text-gray-600" : "text-gray-300";
    const iconColor = isDaytime ? "text-blue-600" : "text-blue-300";
    const borderColor = isDaytime ? "border-white/20" : "border-white/10";
  
    switch (condition) {
      case "clear":
        return {
          title: baseTextColor,
          description: secondaryTextColor,
          text: mutedTextColor,
          icon: iconColor,
          border: borderColor,
          cardBg: "bg-white/10",
          footerBg: isDaytime ? "bg-white/20" : "bg-black/20",
        };
      case "clouds":
      case "rain":
      case "snow":
        return {
          title: "text-white",
          description: "text-gray-200",
          text: "text-gray-300",
          icon: "text-blue-300",
          border: "border-white/10",
          cardBg: "bg-black/20",
          footerBg: "bg-black/30",
        };
      case "thunderstorm":
        return {
          title: "text-white",
          description: "text-purple-200",
          text: "text-gray-200",
          icon: "text-purple-300",
          border: "border-white/10",
          cardBg: "bg-black/30",
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
          footerBg: isDaytime ? "bg-white/20" : "bg-black/20",
        };
    }
  };
  