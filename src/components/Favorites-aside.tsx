import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import useGetWeather from "@/hooks/useGetWeather";
import { City } from "@/types";
import { getWeatherColor } from "@/utils/getWeatherColor";
import { PanelRightClose, X } from "lucide-react";
import { useEffect, useState } from "react";

interface FavoritesAsideProps {
  favorites: Array<{
    city: string;
    temperature: number;
    condition: string;
  }>;
  show: boolean;
  onClose: () => void;
  city: City;
}

export function FavoritesAside({
  favorites,
  show,
  onClose,
  city,
}: FavoritesAsideProps) {
  const { weather } = useGetWeather(city);
  const [colors, setColors] = useState(getWeatherColor(weather));
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (weather) {
      setColors(getWeatherColor(weather));
    }
  }, [weather]);

  return (
    <aside
      className={`
      fixed top-0 right-0 h-full ${isMobile ? "w-full" : "w-80"} ${
        isMobile ? "z-50" : "z-40"
      } backdrop-blur-sm ${colors.cardBg} shadow-lg transform transition-transform duration-300 ease-in-out
      ${show ? "translate-x-0" : "translate-x-full"}
    `}
    >
      <div className="p-4 bg-slate-900 border-b flex justify-between items-center">
        <h2
          className={`text-xl font-semibold ${
            isMobile ? "text-white" : colors.text
          }`}
        >
          Favoritos
        </h2>
        <Button  onClick={onClose} className="bg-transparent" >
          <PanelRightClose className={`h-10 w-10 ${colors.text}`} />
        </Button>
      </div>
      <ScrollArea className="h-[calc(100vh-64px)] p-4">
        <div className="space-y-4">
          {favorites.map((fav) => (
            <Card key={fav.city} className="relative">
              <CardContent className="p-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2"
                >
                  <X className="h-4 w-4" />
                </Button>
                <h3 className="font-semibold">{fav.city}</h3>
                <p>
                  {fav.temperature}°C - {fav.condition}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </aside>
  );
}
