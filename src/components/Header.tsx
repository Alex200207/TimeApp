import { useState } from "react";
import SearchWeather from "./SearchWeather";
import DropDown from "./DropDown";
import MenuNavigator from "./MenuNavigator";
import { City } from "../types";

interface HeaderProps {
  onAddCity: (newCity: City) => void;
}

const Header: React.FC<HeaderProps> = ({ onAddCity }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const hour = new Date().getHours();
  const isDaytime = hour >= 6 && hour < 18;

  // Obtener las clases de color basadas en el momento del día
  const getColorClasses = () => {
    if (isDaytime) {
      return {
        background: 'bg-white/10',
        text: 'text-gray-900',
        accent: 'text-blue-600',
        border: 'border-white/20',
        shadow: 'shadow-light'
      };
    } else {
      return {
        background: 'bg-black/20',
        text: 'text-white',
        accent: 'text-blue-300',
        border: 'border-white/10',
        shadow: 'shadow-dark'
      };
    }
  };

  const colors = getColorClasses();

  return (
    <header className={`p-4 ${colors.shadow} z-50 ${colors.background} backdrop-blur- border-b ${colors.border}`}>
      <nav className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center space-x-4">
          <div className={`text-2xl font-semibold flex-1 text-center lg:text-left ${colors.text}`}>
            <span className={colors.accent}>Time</span>App
          </div>

          <div className="flex-1">
            <SearchWeather onAddCity={onAddCity} />
          </div>

          <div
            className={`lg:hidden p-2 flex-0 ${colors.text}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <DropDown />
          </div>

          <div className={`hidden lg:flex items-center space-x-6 ${colors.text}`}>
            <MenuNavigator />
            <MenuNavigator />
            <MenuNavigator />
          </div>
        </div>

     
        {isMobileMenuOpen && (
          <div className={`lg:hidden mt-4 p-4 rounded-lg ${colors.background} backdrop-blur-xl ${colors.border}`}>
            <div className="flex flex-col space-y-4">
              <MenuNavigator />
              <MenuNavigator />
              <MenuNavigator />
            </div>
          </div>
        )}
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