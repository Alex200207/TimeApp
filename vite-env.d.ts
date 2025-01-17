
interface ImportMetaEnv {
    readonly VITE_API_KEY: string;
    readonly VITE_API_URL: string;
    readonly VITE_API_URL_GEO: string;
    readonly VITE_API_URL_ONECALL: string;

  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
    
  }

  //este archivo es para que typescript reconozca las variables de entorno de vite
  //para que no de error en la consola de la terminal
  //y para que no de error en el editor de codigo

  