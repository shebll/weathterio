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
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<WeatherType | null>(null);
  const [tempType, setTempType] = useState<"c" | "f">("c");
  const [currentTime, setCurrentTime] = useState<string>("");
  const [currentDate, setCurrentDate] = useState<string>("");

  async function fetchData(selectedCity: City) {
    setLoading(true);
    const data = await fetchWeather(
      selectedCity.latitude.toString(),
      selectedCity.longitude.toString()
    );
    setData(data);
    setLoading(false);
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
    return (
      <>
        <h1 className="text-xl font-semibold text-gray-600">
          Select your city or use current location
        </h1>
        <div className="flex flex-col items-center w-full gap-16">
          <div className="flex flex-col items-center w-full gap-2">
            <h1 className="w-32 h-6 bg-gray-200 rounded-md animate-pulse"></h1>
            <div className="flex flex-col items-center gap-1 text-center">
              <p className="h-4 bg-gray-200 rounded-md w-36 animate-pulse"></p>
              <p className="h-4 bg-gray-200 rounded-md w-28 animate-pulse"></p>
            </div>
          </div>
          <div className="bg-gray-200 rounded-full w-[40%] h-48 animate-pulse"></div>
          <div className="flex flex-col items-center w-full gap-2">
            <p className="h-4 bg-gray-200 rounded-md w-36 animate-pulse"></p>
            <h1 className="h-6 bg-gray-200 rounded-md w-44 animate-pulse"></h1>
            <div className="flex flex-row items-center gap-1 text-center">
              <p className="w-20 h-4 bg-gray-200 rounded-md animate-pulse"></p>
              <p className="w-16 h-4 bg-gray-200 rounded-md animate-pulse"></p>
            </div>
          </div>
          <div className="bg-gray-200 rounded-md w-[100%] h-20 flex flex-row items-center gap-16 animate-pulse px-4">
            <div className="flex items-center h-full gap-2">
              <p className="w-10 h-[60%] bg-gray-300 rounded-full animate-pulse"></p>
              <p className="w-16 h-4 bg-gray-300 rounded-md animate-pulse"></p>
            </div>
            <div className="flex items-center h-full gap-2">
              <p className="w-10 h-[60%] bg-gray-300 rounded-full animate-pulse"></p>
              <p className="w-12 h-4 bg-gray-300 rounded-md animate-pulse"></p>
            </div>
            <div className="flex items-center h-full gap-2">
              <p className="w-10 h-[60%] bg-gray-300 rounded-full animate-pulse"></p>
              <p className="h-4 bg-gray-300 rounded-md w-14 animate-pulse"></p>
            </div>
          </div>
        </div>
      </>
    );
  }
  if (!data)
    return <div className="flex flex-col items-center w-full gap-10"></div>;

  if (loading) {
    return (
      <div className="flex flex-col items-center w-full gap-20">
        <div className="flex flex-col items-center w-full gap-2">
          <h1 className="w-32 h-6 bg-gray-200 rounded-md animate-pulse"></h1>
          <div className="flex flex-col items-center gap-1 text-center">
            <p className="h-4 bg-gray-200 rounded-md w-36 animate-pulse"></p>
            <p className="h-4 bg-gray-200 rounded-md w-28 animate-pulse"></p>
          </div>
        </div>
        <div className="bg-gray-200 rounded-full w-[40%] h-48 animate-pulse"></div>
        <div className="flex flex-col items-center w-full gap-2">
          <p className="h-4 bg-gray-200 rounded-md w-36 animate-pulse"></p>
          <h1 className="h-6 bg-gray-200 rounded-md w-44 animate-pulse"></h1>
          <div className="flex flex-row items-center gap-1 text-center">
            <p className="w-20 h-4 bg-gray-200 rounded-md animate-pulse"></p>
            <p className="w-16 h-4 bg-gray-200 rounded-md animate-pulse"></p>
          </div>
        </div>
        <div className="bg-gray-200 rounded-md w-[100%] h-20 flex flex-row items-center gap-16 animate-pulse px-4">
          <div className="flex items-center h-full gap-2">
            <p className="w-10 h-[60%] bg-gray-300 rounded-full animate-pulse"></p>
            <p className="w-16 h-4 bg-gray-300 rounded-md animate-pulse"></p>
          </div>
          <div className="flex items-center h-full gap-2">
            <p className="w-10 h-[60%] bg-gray-300 rounded-full animate-pulse"></p>
            <p className="w-12 h-4 bg-gray-300 rounded-md animate-pulse"></p>
          </div>
          <div className="flex items-center h-full gap-2">
            <p className="w-10 h-[60%] bg-gray-300 rounded-full animate-pulse"></p>
            <p className="h-4 bg-gray-300 rounded-md w-14 animate-pulse"></p>
          </div>
        </div>
      </div>
    );
  }

  if (data)
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
