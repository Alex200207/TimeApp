import { Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className=" text-white text-center p-4">
      <div className="flex flex-col items-center">
        <p className="m-3 text-sm">&copy; {new Date().getFullYear()} TimeApp</p>
        <a
          href="https://github.com/Alex200207"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-white hover:text-gray-400 transition-colors"
        >
          <Github className="w-6 h-6" />
          <span className="font-medium">Alex Talavera</span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
