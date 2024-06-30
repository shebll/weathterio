import { WeatherType } from "../../../../type/Weather";
import { getTempFromType } from "../getTempFromType";

type props = {
  data: WeatherType;
  tempType: "c" | "f";
  setTempType: React.Dispatch<React.SetStateAction<"c" | "f">>;
};
export default function WeatherOverView({
  data,
  tempType,
  setTempType,
}: props) {
  return (
    <div className="flex flex-col items-center w-full gap-2">
      <strong className="text-gray-500 dark:text-gray-300">
        {data.weather[0].main} - {data.weather[0].description}
      </strong>
      <h1 className="text-4xl font-bold">
        {getTempFromType(data.main.feels_like, tempType)}°
        <span className="text-2xl font-medium text-gray-400">
          <span
            className={
              tempType === "c"
                ? "text-gray-800 dark:text-gray-100"
                : "dark:text-gray-500 cursor-pointer"
            }
            onClick={() => setTempType("c")}
          >
            C
          </span>
          {" / "}
          <span
            className={
              tempType === "f"
                ? "text-gray-800 dark:text-gray-100"
                : "dark:text-gray-500 cursor-pointer"
            }
            onClick={() => setTempType("f")}
          >
            F
          </span>
        </span>
      </h1>
      <div className="flex gap-1">
        <p className="text-gray-500 dark:text-gray-300">
          <strong>{getTempFromType(data.main.temp_max, tempType)} ^ </strong>
        </p>
        <p className="text-gray-500 dark:text-gray-300">
          {getTempFromType(data.main.temp_min, tempType)}
        </p>
      </div>
    </div>
  );
}
