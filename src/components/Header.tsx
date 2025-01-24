import { useState } from "react";
import SearchWeather from "./SearchWeather";
import DropDown from "./DropDown";
import { City, WeatherApiResponse } from "../types";
import { Button } from "./ui/button";
import { Heart } from "lucide-react";
import { FavoritesAside } from "./Favorites-aside";
import { AboutModal } from "./Modals/AboutModal";
import { useFavorites } from "@/contexts/WeatherContext";
import { useScrollHeader } from "@/hooks/useScrollHeader";

interface HeaderProps {
  onAddCity: (newCity: City) => void;
  city: City;
  weather: WeatherApiResponse | null;
}

const Header: React.FC<HeaderProps> = ({ onAddCity, city, weather }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isMobile } = useFavorites();
  const isVisible = useScrollHeader();

  const [showFavorites, setShowFavorites] = useState(false);
  const hour = new Date().getHours();
  const isDaytime = hour >= 6 && hour < 18;

  const getColorClasses = () => {
    if (isDaytime) {
      return {
        background: "bg-white/10",
        text: "text-gray-900",
        accent: "text-blue-600",
        border: "border-white/20",
        shadow: "shadow-light",
      };
    } else {
      return {
        background: "bg-black/20",
        text: "text-white",
        accent: "text-blue-300",
        border: "border-white/10",
        shadow: "shadow-dark",
      };
    }
  };

  const colors = getColorClasses();
  const backgroundColor = weather ? colors.background : "bg-gray-800";
  const textColor = weather ? colors.text : "text-white";

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 right-0 px-2 py-3 sm:px-4 sm:py-4 flex items-center justify-center
          ${colors.shadow} 
          z-50 
          ${backgroundColor} 
          backdrop-blur-none backdrop-filter
          border-b 
          ${colors.border} 
          transition-transform duration-300 ease-in-out
          ${isVisible ? "translate-y-0" : "-translate-y-full"}
        `}
      >
        <nav className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center gap-2 sm:gap-4">
            <div
              className={`text-xl sm:text-2xl font-semibold ${colors.text} flex items-center shrink-0`}
            >
              <span className={colors.accent}>Time</span>
              <p className={`${textColor}`}>App</p>
            </div>

            <div className="flex-1 flex justify-center">
              <SearchWeather onAddCity={onAddCity} city={city} />
            </div>

            <div
              className={`lg:hidden flex items-center justify-center shrink-0 ${colors.text}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <DropDown showAside={setShowFavorites} />
            </div>

            <div
              className={`hidden lg:flex items-center space-x-6 shrink-0 ${colors.text}`}
            >
              <AboutModal />
              <Button
                onClick={() => setShowFavorites(!showFavorites)}
                variant="outline"
                className="w-full bg-slate-50 text-white border-none hover:bg-white hover:text-slate-900"
              >
                <Heart
                  className={`mr-2 h-4 w-4 ${
                    isMobile ? "text-black" : "text-black"
                  }`}
                />
                <span
                  className={`text-sm ${
                    isMobile ? "text-black" : "text-black"
                  }`}
                >
                  {showFavorites ? "Ocultar Favoritos" : "Mostrar Favoritos"} (
                  {useFavorites().favorites.length})
                </span>
              </Button>
            </div>
          </div>
        </nav>
      </header>

      <div className="h-[56px] sm:h-[72px]"></div>

      <FavoritesAside
        show={showFavorites}
        onAddCity={onAddCity}
        onClose={() => setShowFavorites(!showFavorites)}
      />

      <style>{`
        .shadow-light {
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        .shadow-dark {
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </>
  );
};

export default Header;
