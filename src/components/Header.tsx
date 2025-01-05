import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import SearchWeather from "./SearchWeather";

interface HeaderProps {
    onAddCity: (newCity: string) => void;
    }
    
const Header: React.FC<HeaderProps> = ({onAddCity}) => (
    

  <header className=" p-4 shadow-md">
    <nav className="max-w-7xl mx-auto flex justify-between items-center">
      <div className=" text-3xl font-semibold">TimeApp</div>

      <NavigationMenu className="flex space-x-6 ">
        <NavigationMenuList className="flex space-x-6">
          <NavigationMenuItem>
            <NavigationMenuTrigger className=" p-2 rounded-lg">
              Item One
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink>Valor 1</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger className=" p-2 rounded-lg">
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
    </nav>
  </header>

);

export default Header;
