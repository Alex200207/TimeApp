import { useState } from "react";
import SearchWeather from "./SearchWeather";
import DropDown from "./DropDown";
import { City } from "../types";
import useGetWeather from "@/hooks/useGetWeather";
import { Button } from "./ui/button";
import { Heart } from "lucide-react";
import { FavoritesAside } from "./Favorites-aside";
import { AboutModal } from "./Modals/AboutModal";
import { useFavorites } from "@/contexts/FavoritesContext";

interface HeaderProps {
  onAddCity: (newCity: City) => void;
  city: City;
}

const Header: React.FC<HeaderProps> = ({ onAddCity, city }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isMobile } = useFavorites();

  const [showFavorites, setShowFavorites] = useState(false);
  const { weather } = useGetWeather(city);
  const hour = new Date().getHours();
  const isDaytime = hour >= 6 && hour < 18;

  // Obtener las clases de color basadas en el momento del día
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
        className={`p-4 ${colors.shadow} z-50 ${backgroundColor} backdrop-blur- border-b ${colors.border} flex space-x-4 items-center`}
      >
        <nav className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center space-x-4">
            <div
              className={`text-2xl font-semibold flex-1 text-center lg:text-left ${colors.text} flex`}
            >
              <span className={colors.accent}>Time</span>
              <p className={`${textColor}`}>App</p>
            </div>

            <div className="flex-2">
              <SearchWeather onAddCity={onAddCity} city={city} />
            </div>

            <div
              className={`lg:hidden p-2 flex-0 ${colors.text}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <DropDown showAside={setShowFavorites} />
            </div>

            <div
              className={`hidden lg:flex items-center space-x-6 ${colors.text}`}
            >
              <AboutModal />
              <Button
                onClick={() => setShowFavorites(!showFavorites)}
                variant="outline"
                className="w-full bg-slate-50 text-white border-none hover:bg-white hover:text-slate-900"
              >
                <Heart className={`mr-2 h-4 w-4 ${isMobile ? 'text-black': 'text-black'}  ` } />
                <span className={` text-sm ${isMobile ? 'text-black': 'text-black '}  `}>
                  {showFavorites ? "Ocultar Favoritos" : "Mostrar Favoritos"}
                </span>
              </Button>
            </div>
          </div>
        </nav>

        <style>{`
        .shadow-light {
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        .shadow-dark {
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
        }
      `}</style>
      </header>

      <FavoritesAside
        show={showFavorites}
        onClose={() => setShowFavorites(!showFavorites)}
        city={city}
      />
    </>
  );
};

export default Header;
