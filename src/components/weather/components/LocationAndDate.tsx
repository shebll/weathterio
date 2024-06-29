import { CurrentDate } from "./CurrentDate";
import { CurrentTime } from "./CurrentTime";

type props = {
  cityName: string;
  country: string;
  Timezone: number;
};
export default function LocationAndDate({
  cityName,
  country,
  Timezone,
}: props) {
  return (
    <div className="flex flex-col items-center w-full gap-2">
      <h1 className="text-2xl font-medium">
        {cityName}, {country}
      </h1>
      <div className="text-center ">
        <CurrentDate Timezone={Timezone} />
        <CurrentTime Timezone={Timezone} />
      </div>
    </div>
  );
}
