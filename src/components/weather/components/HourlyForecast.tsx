import { useEffect, useState } from "react";

import { fetchForecast } from "../../../lib/api/weather";
import { getTempFromType } from "./getTempFromType";

import { weatherIcons } from "../../../data/weatherIcons";
import { ForecastType } from "../../../type/Weather";
import { CurrentDate } from "./CurrentDate";

type props = {
  tempType: "c" | "f";
  selectedCity: City;
  timezone: number;
};
export default function HourlyForecast({
  tempType,
  selectedCity,
  timezone,
}: props) {
  const [loading, setLoading] = useState(false);
  const [forecast, setForecast] = useState<ForecastType | null>(null);

  async function fetchData(selectedCity: City) {
    setLoading(true);
    const forecastData = await fetchForecast(
      selectedCity.latitude.toString(),
      selectedCity.longitude.toString()
    );
    setForecast(forecastData);
    setLoading(false);
  }

  useEffect(() => {
    if (selectedCity) fetchData(selectedCity);
  }, [selectedCity]);

  if (loading) return <ForecastLoading />;
  if (!forecast) return null;

  const hourlyForecast = forecast.list.slice(0, 8); // First 8 entries (24 hours)
  return (
    <div className="flex flex-col items-center w-full bg-gray-200 rounded-md shadow-md">
      <div className="p-4 text-xl">
        <div className="text-center ">
          <CurrentDate Timezone={timezone} />
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
