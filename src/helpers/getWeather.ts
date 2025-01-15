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

export const getPronostico = async () => {
  const url = `http://api.openweathermap.org/data/2.5/forecast?q=jalapa,NI&appid=${API_KEY}&units=metric&lang=es`;


  try {
    const response = await axios.get(url);
    return response.data.list;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};
