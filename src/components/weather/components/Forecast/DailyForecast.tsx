import { getTempFromType } from "../getTempFromType";
import { weatherIcons } from "../../../../data/weatherIcons";
import { ForecastType } from "../../../../type/Weather";

type props = {
  forecast: ForecastType;
  tempType: "c" | "f";
};

const DailyForecast = ({ forecast, tempType }: props) => {
  const dailyForecast = forecast.list.filter((_, idx) => idx % 8 === 0); // Approx. every 24 hours

  return (
    <div className="flex flex-col items-center w-full bg-gray-200 rounded-md shadow-md h-60">
      <div className="p-4 text-xl">
        <div className="text-center">Weekly Forecast</div>
      </div>
      <div className="flex flex-col items-center justify-between w-full overflow-x-auto">
        {dailyForecast.map((day, idx) => (
          <div
            key={idx}
            className="flex flex-row items-center justify-around w-full p-2 transition-all rounded-md shrink-0 hover:bg-gray-300"
          >
            <strong>
              {new Date(day.dt * 1000).toLocaleDateString("en-US", {
                weekday: "long",
              })}
            </strong>
            <img
              src={weatherIcons[day.weather[0].main].day}
              alt={day.weather[0].main}
              width={50}
              height={50}
            />
            <p>
              {getTempFromType(day.main.temp_min, tempType)}° /{" "}
              {getTempFromType(day.main.temp_max, tempType)}°
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyForecast;
