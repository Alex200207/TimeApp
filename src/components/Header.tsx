import { useState } from "react";
import SearchWeather from "./SearchWeather";
import DropDown from "./DropDown";
import MenuNavigator from "./MenuNavigator";

import { City } from "../types"; // Adjust the import path as necessary

interface HeaderProps {
  onAddCity: (newCity: City) => void;
}

const Header: React.FC<HeaderProps> = ({ onAddCity }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="p-4 shadow-md z-50 bg-none bg-opacity-10 backdrop-blur-xl border-none">
      <nav className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center space-x-4">
          <div className="text-2xl font-semibold flex-1">TimeApp</div>

          <div className="flex-1">
            <SearchWeather onAddCity={onAddCity} />
          </div>

          <div
            className="lg:hidden p-2 flex-0"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <DropDown />
          </div>

          <div className="hidden lg:flex items-center space-x-6">
            <MenuNavigator />
            <MenuNavigator />
            <MenuNavigator />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
