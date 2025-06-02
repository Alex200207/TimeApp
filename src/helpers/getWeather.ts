import { API_KEY, API_URL, API_URL_ONECALL } from "@/constants/api";
import axios from "axios";
import { City } from "@/types";

export const getWeather = async (city: City) => {
  const { name, country, state } = city;

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const url = `${API_URL}q=${
    name || state
  }, ${country}&appid=${API_KEY}&units=metric&lang=es`;

  

  try {
    const response = await axios.get(url);
    await delay(800);
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};

export const getPronostico = async (city: City) => {
  const { name, country, state } = city;

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const url = `${API_URL_ONECALL}q=${
    name || state
  }, ${country}&appid=${API_KEY}&units=metric&lang=es`;

  try {
    const response = await axios.get(url);
    await delay(800);
    return response.data.list;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};
