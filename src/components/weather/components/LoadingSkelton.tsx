export const LoadingSkelton = () => {
  return (
    <div className="flex flex-col items-center w-full gap-20">
      <div className="flex flex-col items-center w-full gap-2">
        <h1 className="w-32 h-6 bg-gray-200 rounded-md animate-pulse"></h1>
        <div className="flex flex-col items-center gap-1 text-center">
          <p className="h-4 bg-gray-200 rounded-md w-36 animate-pulse"></p>
          <p className="h-4 bg-gray-200 rounded-md w-28 animate-pulse"></p>
        </div>
      </div>
      <div className="bg-gray-200 rounded-full w-[12rem] h-48 animate-pulse"></div>
      <div className="flex flex-col items-center w-full gap-2">
        <p className="h-4 bg-gray-200 rounded-md w-36 animate-pulse"></p>
        <h1 className="h-6 bg-gray-200 rounded-md w-44 animate-pulse"></h1>
        <div className="flex flex-row items-center gap-1 text-center">
          <p className="w-20 h-4 bg-gray-200 rounded-md animate-pulse"></p>
          <p className="w-16 h-4 bg-gray-200 rounded-md animate-pulse"></p>
        </div>
      </div>
      <div className="bg-gray-200 rounded-md w-[100%] h-20 flex flex-row items-center justify-between animate-pulse px-4">
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
};
