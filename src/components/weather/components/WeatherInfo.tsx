import { WeatherType } from "../../../type/Weather";
import { getTempFromType } from "./getTempFromType";

type props = {
  data: WeatherType;
  tempType: "c" | "f";
};
export default function WeatherInfo({ data, tempType }: props) {
  return (
    <div className="flex flex-row items-center w-full gap-20 p-4 overflow-y-auto bg-gray-200 rounded-md shadow-md">
      <p className="flex items-center gap-3 text-xl font-medium w-max shrink-0">
        <img
          src="/temperature.png"
          alt="temperature image"
          width={20}
          height={20}
        />{" "}
        <p>{getTempFromType(data.main.temp, tempType)}</p>
      </p>
      <p className="flex items-center gap-3 text-xl font-medium w-max shrink-0">
        <img src="/humidity.png" alt="humidity image" width={25} height={25} />
        {data.main.humidity} %
      </p>
      <p className="flex items-center gap-3 text-xl font-medium w-max shrink-0">
        <img src="/wind.png" alt="wind image" width={40} height={40} />{" "}
        <p>{data.wind.speed} KpH</p>
      </p>
      <p className="flex items-center gap-3 text-xl font-medium w-max shrink-0">
        <img
          src="/cloudiness.png"
          alt="cloudiness image"
          width={42}
          height={40}
        />{" "}
        <p>{data.clouds.all} %</p>
      </p>
    </div>
  );
}
