
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AboutMe } from "../AboutMe";

export const  AboutModal = () => {
  return (
    <Dialog >
      <DialogTrigger asChild>
        <Button variant="outline">Acerca del Desarrollador</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-transparent border-none">

        <AboutMe />
      </DialogContent>
    </Dialog>
  );
}
