import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

interface MenuNavigatorProps {
  name: string;
  content: React.ReactNode;
}

const MenuNavigator = ({ name, content }: MenuNavigatorProps) => {
  return (
    <NavigationMenu className="relative z-10">
      <NavigationMenuList className="flex space-x-4 text-white">
        <NavigationMenuItem>
          <NavigationMenuTrigger className="p-2 rounded-lg bg-transparent hover:bg-gray-200 hover:text-black transition">
            {name}
          </NavigationMenuTrigger>
          <NavigationMenuContent
            className="absolute left-0 mt-2 min-w-[200px] bg-gray-50 p-4 rounded-lg shadow-lg"
          >
            <NavigationMenuLink className="block text-center text-gray-800 hover:text-blue-500">
              {content}
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default MenuNavigator;
