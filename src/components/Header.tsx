import { useState } from "react";
import SearchWeather from "./SearchWeather";
import DropDown from "./DropDown";
import MenuNavigator from "./MenuNavigator";

interface HeaderProps {
  onAddCity: (newCity: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onAddCity }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="p-4 shadow-md z-50 bg-none bg-opacity-10 backdrop-blur-xl border-none">
      <nav className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <div className="text-3xl font-semibold">TimeApp</div>

          <div
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <DropDown />
          </div>

          <div className="hidden lg:flex items-center space-x-6">
            <MenuNavigator />
            <MenuNavigator />
            <MenuNavigator />

            <div className="flex justify-center items-center">
              <SearchWeather onAddCity={onAddCity} />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
