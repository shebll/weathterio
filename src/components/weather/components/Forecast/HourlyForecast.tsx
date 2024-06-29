import { getTempFromType } from "../getTempFromType";

import { weatherIcons } from "../../../../data/weatherIcons";
import { ForecastType } from "../../../../type/Weather";

type props = {
  forecast: ForecastType;
  tempType: "c" | "f";
};
export default function HourlyForecast({ forecast, tempType }: props) {
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
