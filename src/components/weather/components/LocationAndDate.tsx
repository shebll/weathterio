type props = {
  currentTime: string;
  currentDate: string;
  cityName: string;
  country: string;
};
export default function LocationAndDate({
  currentTime,
  currentDate,
  cityName,
  country,
}: props) {
  return (
    <div className="flex flex-col items-center w-full gap-2">
      <h1 className="text-2xl font-medium">
        {cityName}, {country}
      </h1>
      <div className="text-center ">
        <p className="text-gray-500">
          <strong>{currentDate.split(" ")[0]}</strong>
          {currentDate.split(",")[1]}
        </p>
        <p className="text-gray-500">{currentTime}</p>
      </div>
    </div>
  );
}
