import { useEffect, useState } from "react";
import { useFavorites } from "@/contexts/WeatherContext";
import type { City } from "@/types";

interface FavoriteHookProps {
  onClose: () => void;
}

export const useFavoriteHook = ({ onClose }: FavoriteHookProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const { favorites, removeFavorite } = useFavorites();
  const [expandedCards, setExpandedCards] = useState<{
    [key: string]: boolean;
  }>({});

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

  const handleRemoveFavorite = (cityToRemove: City) => {
    removeFavorite(cityToRemove);
  };

  const toggleCardExpansion = (cityId: string) => {
    setExpandedCards((prev) => ({
      ...prev,
      [cityId]: !prev[cityId],
    }));
  };

  const showFavorites = (favorites: City[], cityName: string): City[] => {
    const favoritos = favorites.filter((fav) => fav.name === cityName);
    console.log("Favoritos encontrados:", favoritos);
    onClose();
    return favoritos;
  };

  return {
    isMobile,
    favorites,
    expandedCards,
    handleRemoveFavorite,
    toggleCardExpansion,
    showFavorites,
  };
};
