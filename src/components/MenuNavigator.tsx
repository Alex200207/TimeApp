import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const MenuNavigator = () => {
  return (
    <NavigationMenu >
      <NavigationMenuList className="flex space-x-6 text-black">
        <NavigationMenuItem>
          <NavigationMenuTrigger className="p-2 rounded-lg bg-transparent">
            item three
          </NavigationMenuTrigger>
          <NavigationMenuContent className="p-2">
            <NavigationMenuLink className="p-5 text-center">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default MenuNavigator;
