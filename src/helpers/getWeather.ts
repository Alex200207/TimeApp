import axios from "axios";

export const getWeather = async (city: string) => {
  console.log(city);
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=cd0fff38e7266bc916f27925c6ba95b2&units=metric&lang=es`;

  const response = await axios.get(url);

  console.log(response.data);
  return response.data;
};
