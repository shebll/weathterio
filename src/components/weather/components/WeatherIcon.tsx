import { weatherIcons } from "../../../data/weatherIcons";

export default function WeatherIcon({
  Timezone,
  Weather,
}: {
  Timezone: number;
  Weather: string;
}) {
  const currentHour = new Date().getUTCHours() + Timezone / 3600;
  const isDaytime = currentHour >= 6 && currentHour < 18;
  const weatherCondition = Weather;
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
