import axios, { AxiosError } from "axios";
import { ForecastType, WeatherType } from "../../type/Weather";

export async function fetchWeather(
  lat: string,
  lon: string
): Promise<WeatherType> {
  try {
    const response = await axios.get<WeatherType>(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${
        import.meta.env.VITE_WEATHER_API_KEY
      }`
    );

    // handle Invalid response format
    if (!response || !response.data || !isCurrentWeatherType(response.data)) {
      throw new Error("Invalid response format");
    }

    return response.data;
  } catch (error: unknown | AxiosError) {
    if (axios.isAxiosError(error)) {
      console.error("Error fetching forecast data:", error.message);
      if (error.response) {
        console.error("Response data:", error.response.data.message);
      }
    } else {
      console.error("An unexpected error occurred:", error);
    }
    throw error;
  }
}

export async function fetchForecast(
  lat: string,
  lon: string
): Promise<ForecastType> {
  try {
    const response = await axios.get<ForecastType>(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${
        import.meta.env.VITE_WEATHER_API_KEY
      }`
    );

    // handle Invalid response format
    if (!response || !response.data || !isForecastType(response.data)) {
      throw new Error("Invalid response format");
    }

    return response.data;
  } catch (error: unknown | AxiosError) {
    if (axios.isAxiosError(error)) {
      console.error("Error fetching forecast data:", error.message);
      if (error.response) {
        console.error("Response data:", error.response.data.message);
      }
    } else {
      console.error("An unexpected error occurred:", error);
    }
    throw error;
  }
}

function isForecastType(data: unknown): data is ForecastType {
  if (typeof data !== "object" || data === null) return false;

  const forecastData = data as ForecastType;

  return (
    "list" in forecastData &&
    Array.isArray(forecastData.list) &&
    forecastData.list.every(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (item: any) =>
        "dt" in item &&
        typeof item.dt === "number" &&
        "main" in item &&
        typeof item.main === "object" &&
        "temp" in item.main &&
        typeof item.main.temp === "number" &&
        "feels_like" in item.main &&
        typeof item.main.feels_like === "number" &&
        "temp_min" in item.main &&
        typeof item.main.temp_min === "number" &&
        "temp_max" in item.main &&
        typeof item.main.temp_max === "number" &&
        "humidity" in item.main &&
        typeof item.main.humidity === "number" &&
        "weather" in item &&
        Array.isArray(item.weather) &&
        item.weather.every(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (weatherItem: any) =>
            "main" in weatherItem &&
            typeof weatherItem.main === "string" &&
            "description" in weatherItem &&
            typeof weatherItem.description === "string" &&
            "icon" in weatherItem &&
            typeof weatherItem.icon === "string"
        ) &&
        "wind" in item &&
        typeof item.wind === "object" &&
        "speed" in item.wind &&
        typeof item.wind.speed === "number" &&
        "clouds" in item &&
        typeof item.clouds === "object" &&
        "all" in item.clouds &&
        typeof item.clouds.all === "number" &&
        "dt_txt" in item &&
        typeof item.dt_txt === "string"
    )
  );
}

function isCurrentWeatherType(data: unknown): data is WeatherType {
  if (typeof data !== "object" || data === null) return false;

  const weatherData = data as WeatherType;

  return (
    "coord" in weatherData &&
    typeof weatherData.coord === "object" &&
    "lon" in weatherData.coord &&
    typeof weatherData.coord.lon === "number" &&
    "lat" in weatherData.coord &&
    typeof weatherData.coord.lat === "number" &&
    "weather" in weatherData &&
    Array.isArray(weatherData.weather) &&
    weatherData.weather.length > 0 &&
    "main" in weatherData.weather[0] &&
    typeof weatherData.weather[0].main === "string" &&
    "description" in weatherData.weather[0] &&
    typeof weatherData.weather[0].description === "string" &&
    "icon" in weatherData.weather[0] &&
    typeof weatherData.weather[0].icon === "string" &&
    "main" in weatherData &&
    typeof weatherData.main === "object" &&
    "temp" in weatherData.main &&
    typeof weatherData.main.temp === "number" &&
    "feels_like" in weatherData.main &&
    typeof weatherData.main.feels_like === "number" &&
    "temp_min" in weatherData.main &&
    typeof weatherData.main.temp_min === "number" &&
    "temp_max" in weatherData.main &&
    typeof weatherData.main.temp_max === "number" &&
    "pressure" in weatherData.main &&
    typeof weatherData.main.pressure === "number" &&
    "humidity" in weatherData.main &&
    typeof weatherData.main.humidity === "number"
  );
}
