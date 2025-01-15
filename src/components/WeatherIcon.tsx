import { WeatherDay } from "@/types";
import { Cloud, CloudRain, Sun } from "lucide-react";

export const WeatherIcon = ({ icon }: { icon: WeatherDay["icon"] }) => {
  switch (icon) {
    case "rain":
      return <CloudRain className="w-5 h-5 text-orange-500" />;
    case "cloud":
      return <Cloud className="w-5 h-5 text-gray-600" />;
    case "sun":
      return <Sun className="w-5 h-5 text-orange-500" />;
  }
};
