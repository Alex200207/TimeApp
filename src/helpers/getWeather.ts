import axios from "axios";

interface City {
  name: string;
  country: string;
  state?: string;
}

export const getWeather = async (city: City) => {
  const { name, country, state } = city;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${name || state}, ${country}&appid=cd0fff38e7266bc916f27925c6ba95b2&units=metric&lang=es`;

  try {   
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};
