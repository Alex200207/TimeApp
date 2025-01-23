import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Heart, Menu } from "lucide-react";
import { AboutModal } from "./Modals/AboutModal";

interface DropDownProps {
  showAside: React.Dispatch<React.SetStateAction<boolean>>;
}

const DropDown = ({ showAside }: DropDownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:text-white border-none  hover:bg-white/5 transition-colors"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="min-w-[180px] p-[6px] bg-transparent backdrop-blur-xl border border-white/[0.08] shadow-xl shadow-black/20"
      >
        <DropdownMenuItem
          className="group flex items-center px-2 py-2.5 rounded-sm cursor-pointer text-white/90 hover:text-white hover:bg-gradient-to-r from-white/[0.08] to-white/[0.04] transition-colors"
          onClick={() => showAside(true)}
        >
          <Heart className="w-[18px] h-[18px] mr-2.5 text-pink-400/70 group-hover:text-pink-400 transition-colors" />
          <span className="text-[13px] font-normal">Favoritos</span>
        </DropdownMenuItem>

        <AboutModal />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDown;
