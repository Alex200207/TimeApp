import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { AboutMe } from "../AboutMe";
import { useEffect, useState } from "react";
import { DialogTitle } from "@radix-ui/react-dialog";

export const AboutModal = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
 
        <Button
          variant="outline"
          className={`bg-slate-50 ${
            isMobile ? "text-slate-950 " : "text-black"
          } border-none`}
        >
          Acerca de
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-transparent border-none">
      <DialogTitle className="text-2xl font-semibold text-center text-white">
          Acerca del Desarrollador
        </DialogTitle>
        <AboutMe />
      </DialogContent>
    </Dialog>
  );
};
