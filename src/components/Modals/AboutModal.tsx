import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { AboutMe } from "../AboutMe";
import { useEffect, useState } from "react";

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
          className={`bg-transparent ${
            isMobile ? "text-slate-950" : "text-white"
          } border-none`}
        >
          Acerca del Desarrollador
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-transparent border-none">
        <AboutMe />
      </DialogContent>
    </Dialog>
  );
};
