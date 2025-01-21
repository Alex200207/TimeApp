import React, { createContext, useContext, useEffect, useState } from "react";
import { City, FavoritesContextProps } from "@/types";
import { getWeather } from "@/helpers/getWeather";

const WeatherContext = createContext<FavoritesContextProps | undefined>(
  undefined
);

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [favorites, setFavorites] = useState<City[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));

    favorites.forEach((city) => {
      if (!city.weather) {
        togleFavorites(city);
      }
    });
  }, [favorites]);

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

  const togleFavorites = async (city: City) => {
    try {
      const data = await getWeather(city);
      setFavorites((prevFavorites) =>
        prevFavorites.map((fav) =>
          fav.name === city.name ? { ...fav, weather: data } : fav
        )
      );
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const removeFavorite = (cityToRemove: City) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((fav) => fav.name !== cityToRemove.name)
    );
  };

  const isFavorite = (city: City) =>
    favorites.some((fav) => fav.name === city.name);

  return (
    <WeatherContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
        isMobile,
        removeFavorite,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("useFavorites debe estar dentro de un WeatherProvider");
  }
  return context;
};
