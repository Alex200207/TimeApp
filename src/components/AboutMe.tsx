import {
  Card,
  CardContent,
  CardHeader,

} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { FacebookIcon, GithubIcon, LinkedinIcon } from "lucide-react";

export const AboutMe = () => {
  return (
    <Card className="w-full max-w-md mx-auto ">
      <CardHeader className="text-center">
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        <Avatar className="w-24 h-24">
          <AvatarImage src="/avatar.jpg" alt="Foto del desarrollador" />
          <AvatarFallback>
            <img
              src="https://i.pinimg.com/736x/3e/f9/5e/3ef95eb2be325c976ac5e33d3efb1224.jpg"
              alt="Perfil"
            />
          </AvatarFallback>
        </Avatar>
        <div className="text-center">
          <h2 className="text-xl font-semibold">Eddy Alexis Talavera</h2>
          <p className="text-sm text-muted-foreground">Desarrollador junior</p>
        </div>
        <div className="flex space-x-2">
          <Badge variant="secondary">React</Badge>
          <Badge variant="secondary">TypeScript</Badge>
          <Badge variant="secondary">Tailwind CSS</Badge>
        </div>
        <p className="text-sm text-center max-w-xs">
          Apasionado por crear aplicaciones web intuitivas y eficientes.
          Especializado en React y TypeScript.
        </p>
        <div className="flex space-x-4">
          <a
            href="https://github.com/Alex200207"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary"
          >
            <GithubIcon className="w-6 h-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/alex-talavera-57a8b12a2/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary"
          >
            <LinkedinIcon className="w-6 h-6" />
          </a>
          <a
            href="https://www.facebook.com/alexis.talavera.503?locale=es_LA"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary"
          >
            <FacebookIcon className="w-6 h-6" />
          </a>
        </div>
      </CardContent>
    </Card>
  );
};
