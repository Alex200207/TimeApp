import { API_KEY, API_URL } from "@/constants/api";
import axios from "axios";
import { City } from "@/types";

export const getWeather = async (city: City) => {
  const { name, country, state } = city;

  const url = `${API_URL}q=${
    name || state
  }, ${country}&appid=${API_KEY}&units=metric&lang=es`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};
