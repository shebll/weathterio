import { useEffect, useState } from "react";
import LocationAndDate from "./currentWeather/LocationAndDate";
import WeatherIcon from "./currentWeather/WeatherIcon";
import WeatherOverView from "./currentWeather/WeatherOverView";
import { WeatherType } from "../../../type/Weather";
import { fetchWeather } from "../../../lib/api/weather";
import { LoadingSkelton } from "./currentWeather/LoadingSkelton";
import WeatherInfo from "./currentWeather/WeatherInfo";
import axios from "axios";

type props = {
  selectedCity: City;
  tempType: "c" | "f";
  setTempType: React.Dispatch<React.SetStateAction<"c" | "f">>;
};
export default function CurrentWeatherWidget({
  selectedCity,
  setTempType,
  tempType,
}: props) {
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<WeatherType | null>(null);
  const [loading, setLoading] = useState(false);

  async function fetchData(selectedCity: City) {
    setLoading(true);
    setError(null);
    try {
      const weatherData = await fetchWeather(
        selectedCity.latitude.toString(),
        selectedCity.longitude.toString()
      );
      // Save data to local storage
      localStorage.setItem(
        "currentWeatherData",
        JSON.stringify({
          timestamp: Date.now(),
          data: weatherData,
        })
      );
      setData(weatherData);
    } catch (error: unknown) {
      if (!navigator.onLine) {
        const cachedCurrentWeather = localStorage.getItem("currentWeatherData");
        if (cachedCurrentWeather) {
          const { data } = JSON.parse(cachedCurrentWeather);
          setData(data);
          setError("You are offline. Showing the latest available data.");
        } else {
          setError("You are offline and no data is available.");
        }
      } else if (axios.isAxiosError(error)) {
        // if api provider given error
        if (error.response) {
          setError(`Error fetching data: ${error.response.data.message}`);
        } else {
          setError(`Error fetching data: ${error.message}`);
        }
      } else if (error instanceof Error) {
        setError(`${error.message}`);
      } else {
        setError("Something went wrong try again");
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (selectedCity) {
      const cachedCurrentWeather = localStorage.getItem("currentWeatherData");
      if (cachedCurrentWeather) {
        const { timestamp, data } = JSON.parse(cachedCurrentWeather);
        // if user select new city
        if (selectedCity.name !== data.name) fetchData(selectedCity);
        const now = Date.now();
        const age = now - timestamp;
        const maxAge = 5 * 60 * 1000; // 3 min

        if (age < maxAge) {
          setData(data);
        } else {
          fetchData(selectedCity);
        }
      } else {
        fetchData(selectedCity);
      }
    }
  }, [selectedCity]);

  if (loading) return <LoadingSkelton />;

  if (error)
    return (
      <div className="flex flex-col items-center w-full gap-2 p-4 text-gray-100 bg-red-400 rounded-md">
        <p>{error}</p>
        <button
          className="w-full p-2 bg-red-500 rounded-md"
          onClick={() => fetchData(selectedCity)}
        >
          Reload
        </button>
      </div>
    );

  if (!data) return null;
  if (data)
    return (
      <>
        {/* location date component */}
        <LocationAndDate
          Timezone={data.timezone}
          cityName={data.name}
          country={data.sys.country}
        />
        {/* Weather Icon component */}
        <WeatherIcon Weather={data.weather[0].main} Timezone={data.timezone} />

        {/* Weather OverView component */}
        <WeatherOverView
          tempType={tempType}
          setTempType={setTempType}
          data={data}
        />

        {/* Weather Info for day component */}
        <WeatherInfo tempType={tempType} data={data} />
      </>
    );
}
