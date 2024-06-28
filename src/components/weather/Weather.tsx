import { useEffect, useState } from "react";
import { useCity } from "../../context/CityContext";
import { fetchWeather } from "../../lib/api/weather";
import { WeatherType } from "../../type/Weather";

export default function Weather() {
  const { selectedCity } = useCity();
  const [data, setData] = useState<WeatherType | null>(null);
  const [currentTime, setCurrentTime] = useState<string>("");

  async function fetchData(selectedCity: City) {
    const data = await fetchWeather(
      selectedCity.latitude.toString(),
      selectedCity.longitude.toString()
    );
    setData(data);
  }

  useEffect(() => {
    if (selectedCity) fetchData(selectedCity);
  }, [selectedCity]);

  useEffect(() => {
    if (data) {
      const updateCurrentTime = () => {
        const date = new Date();
        const localTime = date.getTime();
        const localOffset = date.getTimezoneOffset() * 60000;
        const utc = localTime + localOffset;
        const cityTime = utc + data.timezone * 1000;
        setCurrentTime(new Date(cityTime).toLocaleTimeString());
      };

      updateCurrentTime();
      const intervalId = setInterval(updateCurrentTime, 1000);
      return () => clearInterval(intervalId);
    }
  }, [data]);

  if (!selectedCity) {
    return <div>No selected city</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  const avgTemp = (
    (data.main.temp_min + data.main.temp_max) / 2 -
    273.15
  ).toFixed(2);

  return (
    <div>
      <h1>
        Weather in {data.name}, {data.sys.country}
      </h1>
      <p>Current Time: {currentTime}</p>
      <p>Temperature: {(data.main.temp - 273.15).toFixed(2)} °C</p>
      <p>Feels like: {(data.main.feels_like - 273.15).toFixed(2)} °C</p>
      <p>Average Temperature: {avgTemp} °C</p>
      <p>
        Weather: {data.weather[0].main} - {data.weather[0].description}
      </p>
      <p>Humidity: {data.main.humidity}%</p>
      <p>Wind Speed: {data.wind.speed} m/s</p>
      <p>Cloudiness: {data.clouds.all}%</p>
    </div>
  );
}
