
import { ChevronDown, Cloud, CloudRain, Sun } from "lucide-react";


interface WeatherDay {
  date: string;
  day: string;
  highTemp: number;
  lowTemp: number;
  condition: string;
  icon: "rain" | "cloud" | "sun";
}

const weatherData: WeatherDay[] = [
  {
    date: "Jan 13",
    day: "Mon",
    highTemp: 26,
    lowTemp: 18,
    condition: "light rain",
    icon: "rain",
  },
  {
    date: "Jan 14",
    day: "Tue",
    highTemp: 25,
    lowTemp: 16,
    condition: "broken clouds",
    icon: "cloud",
  },
  {
    date: "Jan 15",
    day: "Wed",
    highTemp: 24,
    lowTemp: 15,
    condition: "light rain",
    icon: "rain",
  },
  {
    date: "Jan 16",
    day: "Thu",
    highTemp: 26,
    lowTemp: 15,
    condition: "broken clouds",
    icon: "cloud",
  },
  {
    date: "Jan 17",
    day: "Fri",
    highTemp: 26,
    lowTemp: 14,
    condition: "broken clouds",
    icon: "cloud",
  },
  {
    date: "Jan 18",
    day: "Sat",
    highTemp: 26,
    lowTemp: 14,
    condition: "clear sky",
    icon: "sun",
  },
  {
    date: "Jan 19",
    day: "Sun",
    highTemp: 27,
    lowTemp: 16,
    condition: "light rain",
    icon: "rain",
  },
];

const WeatherIcon = ({ icon }: { icon: WeatherDay["icon"] }) => {


  
  switch (icon) {
    case "rain":
      return <CloudRain className="w-5 h-5 text-orange-500" />;
    case "cloud":
      return <Cloud className="w-5 h-5 text-gray-600" />;
    case "sun":
      return <Sun className="w-5 h-5 text-orange-500" />;
  }
};

export default function WeatherForecast() {
  return (
    <div className="flex justify-center items-center p-2">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm p-2">
        <h2 className="text-xl font-semibold p-4 border-b">Pronostico</h2>
        <div className="divide-y">
          {weatherData.map((day, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors cursor-pointer group"
            >
              <div className="w-28">
                <span className="text-gray-900">{day.day}, </span>
                <span className="text-gray-600">{day.date}</span>
              </div>
              <div className="flex items-center gap-2 min-w-[100px]">
                <WeatherIcon icon={day.icon} />
                <span className="text-gray-900">
                  {day.highTemp} / {day.lowTemp}°C
                </span>
              </div>
              <div className="flex items-center justify-between gap-2 flex-1 max-w-[200px]">
                <span className="text-gray-600 text-sm">{day.condition}</span>
                <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
