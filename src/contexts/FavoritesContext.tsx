import React, { createContext, useContext, useState } from "react";
import { City } from "@/types";

interface FavoritesContextProps {
  favorites: City[];
  toggleFavorite: (city: City) => void;
  isFavorite: (city: City) => boolean;
}

const FavoritesContext = createContext<FavoritesContextProps | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<City[]>([]);

  const toggleFavorite = (city: City) => {
    setFavorites((prevFavorites) =>
      prevFavorites.some((fav) => fav.name === city.name)
        ? prevFavorites.filter((fav) => fav.name !== city.name)
        : [...prevFavorites, city]
    );
  };

  const isFavorite = (city: City) => favorites.some((fav) => fav.name === city.name);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
