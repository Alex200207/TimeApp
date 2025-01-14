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
  content: string;
}

const MenuNavigator = ({name, content}: MenuNavigatorProps) => {
  return (
    <NavigationMenu >
      <NavigationMenuList className="flex space-x-6 text-while">
        <NavigationMenuItem>
          <NavigationMenuTrigger className="p-2 rounded-lg bg-transparent">
            {name}
          </NavigationMenuTrigger>
          <NavigationMenuContent className="p-2">
            <NavigationMenuLink className="p-5 text-center">
              {content}
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default MenuNavigator;
