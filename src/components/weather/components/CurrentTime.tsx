import { useEffect, useState } from "react";

export const CurrentTime = ({ Timezone }: { Timezone: number }) => {
  const [currentTime, setCurrentTime] = useState<string>("");
  const updateCurrentTime = (Timezone: number) => {
    const date = new Date();
    const localTime = date.getTime();
    const localOffset = date.getTimezoneOffset() * 60000;
    const utc = localTime + localOffset;
    const cityTime = utc + Timezone * 1000;
    const cityDate = new Date(cityTime);

    return cityDate.toLocaleTimeString();
  };
  useEffect(() => {
    if (Timezone) {
      setCurrentTime(updateCurrentTime(Timezone));
      const intervalId = setInterval(updateCurrentTime, 1000);
      return () => clearInterval(intervalId);
    }
  }, [Timezone]);

  return <p className="text-gray-500 dark:text-gray-300">{currentTime}</p>;
};
