import { useState } from "react";
import { useCity } from "../../context/CityContext";

import HourlyForecast from "./components/HourlyForecast";

import { LoadingSkelton } from "./components/LoadingSkelton";
import CurrentWeatherWidget from "./components/CurrentWeatherWidget";

export default function Weather() {
  const { selectedCity } = useCity();
  const [tempType, setTempType] = useState<"c" | "f">("c");

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

  return (
    <div className="flex flex-col items-center w-full gap-10">
      {/* Current Weather component */}
      <CurrentWeatherWidget
        selectedCity={selectedCity}
        setTempType={setTempType}
        tempType={tempType}
      />

      {/* Forecast for every hours in day component */}
      <HourlyForecast
        tempType={tempType}
        selectedCity={selectedCity}
        // timezone={data.timezone}
      />
    </div>
  );
}
