import { useState } from "react";
import SearchWeather from "./SearchWeather";
import DropDown from "./DropDown";
import MenuNavigator from "./MenuNavigator";
import { City } from "../types";
import useGetWeather from "@/hooks/useGetWeather";
import { Button } from "./ui/button";
import { Heart } from "lucide-react";

interface HeaderProps {
  onAddCity: (newCity: City) => void;
  city: City;
}

const Header: React.FC<HeaderProps> = ({ onAddCity, city }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  return (
    <header
      className={`p-4 ${colors.shadow} z-50 ${backgroundColor} backdrop-blur- border-b ${colors.border} flex space-x-4 items-center`}
    >
      <nav className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center space-x-4">
          <div
            className={`text-2xl font-semibold flex-1 text-center lg:text-left ${colors.text}`}
          >
            <span className={colors.accent}>Time</span>App
          </div>

          <div className="flex-1">
            <SearchWeather onAddCity={onAddCity} city={city} />
          </div>

          <div
            className={`lg:hidden p-2 flex-0 ${colors.text}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <DropDown />
          </div>

          <div
            className={`hidden lg:flex items-center space-x-6 ${colors.text}`}
          >
            <MenuNavigator name="Home" content="Algo" />
            <MenuNavigator
              name="About"
              content="Otra cosa"
            />
            <Button
              className={`bg-transparent ${colors.text} border-none hover:bg-white hover:text-black`}
            >
              Favoritos <Heart className="w-5 h-5" />
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
  );
};

export default Header;
