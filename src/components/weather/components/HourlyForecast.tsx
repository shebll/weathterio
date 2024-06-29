import { useEffect, useState } from "react";

import { fetchForecast } from "../../../lib/api/weather";
import { getTempFromType } from "./getTempFromType";

import { weatherIcons } from "../../../data/weatherIcons";
import { ForecastType } from "../../../type/Weather";
// import { CurrentDate } from "./CurrentDate";
import axios from "axios";

type props = {
  tempType: "c" | "f";
  selectedCity: City;
  // timezone: number;
};
export default function HourlyForecast({
  tempType,
  selectedCity,
}: // timezone,
props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [forecast, setForecast] = useState<ForecastType | null>(null);

  async function fetchData(selectedCity: City) {
    setLoading(true);
    setError(null);
    try {
      const forecastData = await fetchForecast(
        selectedCity.latitude.toString(),
        selectedCity.longitude.toString()
      );
      setForecast(forecastData);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
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
    if (selectedCity) fetchData(selectedCity);
  }, [selectedCity]);

  if (loading) return <ForecastLoading />;

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
  if (!forecast) return null;

  const hourlyForecast = forecast.list.slice(0, 8); // First 8 entries (24 hours)
  return (
    <div className="flex flex-col items-center w-full bg-gray-200 rounded-md shadow-md">
      <div className="p-4 text-xl">
        <div className="text-center ">
          Today
          {/* <CurrentDate Timezone={timezone} /> */}
        </div>
      </div>
      <div className="flex flex-row items-center w-full gap-8 px-4 overflow-y-auto">
        {hourlyForecast.map((hour, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center p-2 transition-all rounded-md w-max shrink-0 hover:bg-gray-300"
          >
            <p>{getTempFromType(hour.main.temp, tempType)}°</p>
            <img
              src={weatherIcons[hour.weather[0].main]?.day}
              alt={hour.weather[0].main}
              width={50}
              height={50}
            />
            <p>{new Date(hour.dt * 1000).getHours()}:00</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const ForecastLoading = () => {
  return (
    <div className="flex flex-col items-center w-full gap-8 p-4 bg-gray-200 rounded-md animate-pulse">
      <p className="w-32 h-5 bg-gray-300 rounded-md animate-pulse"></p>
      <div className="w-[100%] h-24 flex flex-row items-center justify-between">
        {[1, 2, 3, 4, 5].map((_, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-between h-full"
          >
            <p className="w-16 h-4 bg-gray-300 rounded-md animate-pulse"></p>
            <p className="w-10 h-[40%] bg-gray-300 rounded-md animate-pulse"></p>
            <p className="w-16 h-4 bg-gray-300 rounded-md animate-pulse"></p>
          </div>
        ))}
      </div>
    </div>
  );
};
