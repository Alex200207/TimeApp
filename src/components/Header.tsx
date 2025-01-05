import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { X } from "lucide-react";
import SearchWeather from "./SearchWeather";
import DropDown from "./DropDown";

interface HeaderProps {
  onAddCity: (newCity: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onAddCity }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="p-4 shadow-md">
      <nav className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <div className="text-3xl font-semibold">TimeApp</div>

          <div
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <DropDown />}
          </div>

          <div className="hidden lg:flex items-center space-x-6">
            <NavigationMenu>
              <NavigationMenuList className="flex space-x-6">
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="p-2 rounded-lg">
                    Item One
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <NavigationMenuLink>Valor 1</NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="p-2 rounded-lg">
                    Item Two
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <NavigationMenuLink>Valor 2</NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="p-2 rounded-lg">
                    Item Three
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <NavigationMenuLink>Valor 3</NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

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
