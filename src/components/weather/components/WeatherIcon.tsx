import { weatherIcons } from "../../../data/weatherIcons";
import { WeatherType } from "../../../type/Weather";

export default function WeatherIcon({ data }: { data: WeatherType }) {
  const currentHour = new Date().getUTCHours() + data.timezone / 3600;
  const isDaytime = currentHour >= 6 && currentHour < 18;
  const weatherCondition = data.weather[0].main;
  const weatherImage = weatherIcons[weatherCondition]
    ? isDaytime
      ? weatherIcons[weatherCondition].day
      : weatherIcons[weatherCondition].night
    : "";
  return (
    <div className="">
      <img src={weatherImage} alt={weatherCondition} width={300} height={300} />
    </div>
  );
}
