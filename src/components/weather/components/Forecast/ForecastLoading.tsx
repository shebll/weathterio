export const HourlyForecastLoading = () => {
  return (
    <div className="flex flex-col items-center w-full gap-8 p-4 bg-gray-200 rounded-md animate-pulse">
      <p className="w-32 h-5 bg-gray-300 rounded-md animate-pulse"></p>
      <div className="w-[100%] h-24 flex flex-row items-center justify-between">
        {[1, 2, 3, 4, 5].map((_, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-between h-full"
          >
            <p className="w-16 h-4 bg-gray-300 rounded-md animate-pulse"></p>
            <p className="w-10 h-[40%] bg-gray-300 rounded-md animate-pulse"></p>
            <p className="w-16 h-4 bg-gray-300 rounded-md animate-pulse"></p>
          </div>
        ))}
      </div>
    </div>
  );
};
export const DailyForecastLoading = () => {
  return (
    <div className="flex flex-col items-center w-full gap-4 p-4 bg-gray-200 rounded-md animate-pulse">
      <p className="w-32 h-5 bg-gray-300 rounded-md animate-pulse"></p>
      <div className="w-[100%] flex flex-col items-center justify-between">
        {[1, 2, 3].map((_, i) => (
          <div
            key={i}
            className="flex flex-row items-center justify-around w-full h-12"
          >
            <p className="w-16 h-4 bg-gray-300 rounded-md animate-pulse"></p>
            <p className="w-20 h-[80%] bg-gray-300 rounded-md animate-pulse"></p>
            <p className="w-16 h-4 bg-gray-300 rounded-md animate-pulse"></p>
          </div>
        ))}
      </div>
    </div>
  );
};
