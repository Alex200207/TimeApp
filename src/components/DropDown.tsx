import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Heart, Menu } from "lucide-react";

const DropDown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Menu />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2 mr-1">
        <DropdownMenuLabel>Menu</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Home</DropdownMenuItem>
        <DropdownMenuItem className="text-sm">Favoritos <Heart className="w-4 h-4"/></DropdownMenuItem>
        <DropdownMenuItem>Acerca</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDown;
