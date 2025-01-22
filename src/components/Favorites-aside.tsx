import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useFavoriteHook } from "@/hooks/useFavoriteHook";
import { City } from "@/types";

import {
  PanelRightClose,
  Trash2,
  Eye,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface FavoritesAsideProps {
  show: boolean;
  onClose: () => void;
  onAddCity: (newCity: City) => void;
}

export const FavoritesAside = ({
  show,
  onClose,
  onAddCity,
}: FavoritesAsideProps) => {
  const {
    favorites,
    expandedCards,
    toggleCardExpansion,
    handleRemoveFavorite,
    showFavorites,
    isMobile,
  } = useFavoriteHook({ onClose, onAddCity });

  return (
    <aside
      className={`
      fixed top-0 right-0 h-full  z-50 ${isMobile ? "w-full" : "w-80"} ${
        isMobile ? "z-50" : "z-40"
      } backdrop-blur-sm bg-transparent   shadow-lg transform transition-transform duration-300 ease-in-out
      ${show ? "translate-x-0" : "translate-x-full"}
    `}
    >
      <div className="p-3  bg-slate-800 border-b overflow-auto border-slate-700 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-slate-50">Favoritos</h2>
        <Button
          onClick={onClose}
          variant="ghost"
          size="icon"
          className="text-slate-300 hover:text-slate-100"
        >
          <PanelRightClose className="h-5 w-5" />
        </Button>
      </div>

      {favorites.length === 0 && (
        <div className="p-4 text-center text-slate-300 ">
          No tienes ciudades favoritas
        </div>
      )}
      <ScrollArea className="h-[calc(100vh-48px)] p-2">
        <div className="space-y-2">
          {favorites.map((fav) => {
            const isExpanded = expandedCards[fav.name] || false;

            return (
              <Card
                key={fav.name}
                className="bg-slate-800 border-slate-700 overflow-hidden"
              >
                <CardContent className="p-2 ">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {fav.weather?.weather[0].icon && (
                        <img
                          src={`https://openweathermap.org/img/wn/${fav.weather.weather[0].icon}.png`}
                          alt={fav.weather.weather[0].description}
                          className="w-8 h-8"
                        />
                      )}
                      <div>
                        <h3 className="font-semibold text-slate-100">
                          {fav.name}
                        </h3>
                        <p className="text-xs text-slate-400">{fav.country}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-slate-100">
                        {fav.weather?.main.temp.toFixed(1)}°C
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleCardExpansion(fav.name)}
                        className="text-slate-300  p-0"
                      >
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  {isExpanded && (
                    <div className="mt-2 pt-2 border-t border-slate-700">
                      <p className="text-sm capitalize text-slate-300 mb-2">
                        {fav.weather?.weather[0].description}
                      </p>
                      <div className="grid grid-cols-2 gap-1 text-xs text-slate-400">
                        <div>
                          Sensación: {fav.weather?.main.feels_like.toFixed(1)}°C
                        </div>
                        <div>Humedad: {fav.weather?.main.humidity}%</div>
                        <div>Viento: {fav.weather?.wind.speed} m/s</div>
                        <div>Presión: {fav.weather?.main.pressure} hPa</div>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className={`w-full  text-xs`}
                          onClick={() => showFavorites(favorites, fav.name)}
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          Ver más
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full bg-red-900/50 hover:bg-red-900/70 text-red-100 border-red-800 text-xs"
                          onClick={() => handleRemoveFavorite(fav)}
                        >
                          <Trash2 className="w-3 h-3 mr-1" />
                          Borrar
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card >
            );
          })}
        </div>
      </ScrollArea>
    </aside>
  );
};
