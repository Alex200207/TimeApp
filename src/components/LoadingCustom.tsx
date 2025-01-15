import { Cloud, CloudRain, Sun } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

export const LoadingCustom = () => (
  <div className="flex flex-col items-center justify-center flex-grow space-y-6">
    <div className="relative">
      <Skeleton className="w-16 h-16 rounded-full bg-sky-100 animate-pulse">
        <Cloud
          className="w-16 h-16 text-sky-500 animate-bounce"
          strokeWidth={1.5}
        />
      </Skeleton>

      <div className="absolute -top-4 -right-4">
        <Sun
          className="w-8 h-8 text-amber-400 animate-spin-slow"
          strokeWidth={1.5}
        />
      </div>
      <div className="absolute -bottom-2 -left-2">
        <CloudRain
          className="w-8 h-8 text-blue-400 animate-bounce-slow"
          strokeWidth={1.5}
        />
      </div>
    </div>

    <div className="flex flex-col items-center space-y-2">
      <p className="text-2xl font-medium bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent animate-pulse">
        Cargando...
      </p>
      <p className="text-sm text-gray-500">Obteniendo datos del clima</p>
    </div>
  </div>
);
