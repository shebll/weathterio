import { useEffect, useState } from "react";
import DailyForecast from "./DailyForecast";
import HourlyForecast from "./HourlyForecast";
import { ForecastType } from "../../../../type/Weather";
import { fetchForecast } from "../../../../lib/api/weather";
import axios from "axios";
import { DailyForecastLoading, HourlyForecastLoading } from "./ForecastLoading";

type props = {
  tempType: "c" | "f";
  selectedCity: City;
};
export default function Forecast({ tempType, selectedCity }: props) {
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
      console.log("houly", forecastData);
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

  if (loading)
    return (
      <>
        <HourlyForecastLoading /> <DailyForecastLoading />
      </>
    );

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

  return (
    <>
      {/* Forecast for every hours in day component */}
      <HourlyForecast tempType={tempType} forecast={forecast} />

      {/* Forecast for every day in week component */}
      <DailyForecast tempType={tempType} forecast={forecast} />
    </>
  );
}
