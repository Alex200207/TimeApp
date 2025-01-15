// types/weather.ts
export interface WeatherApiResponse {
  coord: {
    lon: number;
    lat: number;
  };
  weather: Weather[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: WindData;
  clouds: CloudsData;
  dt: number;
  sys: SysData;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}
export type WeatherDay = {
  icon: "rain" | "cloud" | "sun";
};

export type WeatherForecastItem = {
  dt: number; // Timestamp (en segundos)
  main: MainWeatherData;
  weather: Weather[];
  clouds: CloudsData;
  wind: WindData;
  snow?: SnowData;
  sys: SysData;
  dt_txt: string; // Fecha y hora en formato "YYYY-MM-DD HH:mm:ss"
  icon?: "rain" | "cloud" | "sun";
};



export type WeatherForecastApiResponse = {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherForecastItem[];
};


export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface MainWeatherData {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
}

export interface WindData {
  speed: number;
  deg: number;
}

export interface CloudsData {
  all: number;
}

export interface SysData {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

export interface City {
  name: string;
  country: string;
  state?: string;
}

export interface SnowData {
  '1h'?: number;
  '3h'?: number;
}
