import axios from "axios";
import { WeatherType } from "../../type/Weather";

export async function fetchWeather(
  lat: string,
  lon: string
): Promise<WeatherType | null> {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${
        import.meta.env.VITE_WEATHER_API_KEY
      }`
    );

    const data: WeatherType = response.data;
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
}

export async function fetchForecast(lat: string, lon: string) {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${
        import.meta.env.VITE_WEATHER_API_KEY
      }`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching forecast data:", error);
    throw error;
  }
}
