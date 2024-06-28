import { useEffect, useState } from "react";
import { useCity } from "../../context/CityContext";
import { fetchWeather } from "../../lib/api/weather";
import { WeatherType } from "../../type/Weather";
import LocationAndDate from "./components/LocationAndDate";
import WeatherIcon from "./components/WeatherIcon";
import WeatherOverView from "./components/WeatherOverView";
import WeatherInfo from "./components/WeatherInfo";

export default function Weather() {
  const { selectedCity } = useCity();
  const [data, setData] = useState<WeatherType | null>(null);
  const [tempType, setTempType] = useState<"c" | "f">("c");
  const [currentTime, setCurrentTime] = useState<string>("");
  const [currentDate, setCurrentDate] = useState<string>("");

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
        const cityDate = new Date(cityTime);

        setCurrentTime(cityDate.toLocaleTimeString());
        setCurrentDate(
          cityDate.toLocaleDateString("en-US", {
            weekday: "long",
            month: "short",
            day: "numeric",
          })
        );
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

  return (
    <div className="flex flex-col items-center w-full gap-10">
      <LocationAndDate
        currentDate={currentDate}
        currentTime={currentTime}
        cityName={data.name}
        country={data.sys.country}
      />
      <WeatherIcon data={data} />
      <WeatherOverView
        tempType={tempType}
        setTempType={setTempType}
        data={data}
      />

      <WeatherInfo tempType={tempType} data={data} />
    </div>
  );
}
