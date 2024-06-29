import { useEffect, useState } from "react";
import { useCity } from "../../context/CityContext";

import { fetchWeather } from "../../lib/api/weather";
import type { WeatherType } from "../../type/Weather";

import LocationAndDate from "./components/LocationAndDate";
import WeatherIcon from "./components/WeatherIcon";
import WeatherOverView from "./components/WeatherOverView";
import WeatherInfo from "./components/WeatherInfo";
import HourlyForecast from "./components/HourlyForecast";

import { LoadingSkelton } from "./components/LoadingSkelton";

export default function Weather() {
  const { selectedCity } = useCity();

  const [data, setData] = useState<WeatherType | null>(null);
  const [loading, setLoading] = useState(false);

  const [tempType, setTempType] = useState<"c" | "f">("c");

  async function fetchData(selectedCity: City) {
    setLoading(true);
    const weatherData = await fetchWeather(
      selectedCity.latitude.toString(),
      selectedCity.longitude.toString()
    );
    setData(weatherData);
    setLoading(false);
  }

  useEffect(() => {
    if (selectedCity) fetchData(selectedCity);
  }, [selectedCity]);

  if (!selectedCity) {
    return (
      <>
        <h1 className="text-xl font-semibold text-gray-600">
          Select your city or use current location
        </h1>
        <LoadingSkelton />
      </>
    );
  }
  if (!data) return null;

  if (loading) return <LoadingSkelton />;

  if (data)
    return (
      <div className="flex flex-col items-center w-full gap-10">
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

        {/* Forecast for every hours in day component */}
        <HourlyForecast
          tempType={tempType}
          selectedCity={selectedCity}
          timezone={data.timezone}
        />
      </div>
    );
}
