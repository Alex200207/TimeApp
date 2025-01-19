import React, { createContext, useContext, useEffect, useState } from "react";
import { City, FavoritesContextProps } from "@/types";

const FavoritesContext = createContext<FavoritesContextProps | undefined>(
  undefined
);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [favorites, setFavorites] = useState<City[]>([]);
  

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

  const toggleFavorite = (city: City) => {
    setFavorites((prevFavorites) =>
      prevFavorites.some((fav) => fav.name === city.name)
        ? prevFavorites.filter((fav) => fav.name !== city.name)
        : [...prevFavorites, city]
    );
  };

  const isFavorite = (city: City) =>
    favorites.some((fav) => fav.name === city.name);

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite, isMobile }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error(" useFavorites debe estar dentro de un FavoritesProvider");
  }
  return context;
};
