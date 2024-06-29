import { useEffect, useState } from "react";

export const CurrentDate = ({ Timezone }: { Timezone: number }) => {
  const [currentDate, setCurrentDate] = useState<string>("");
  useEffect(() => {
    if (Timezone) setCurrentDate(updateCurrentDate(Timezone));
  }, [Timezone]);
  return (
    <p className="text-gray-500">
      <strong>{currentDate.split(" ")[0]}</strong>
      {currentDate.split(",")[1]}
    </p>
  );
};

const updateCurrentDate = (Timezone: number) => {
  const date = new Date();
  const localTime = date.getTime();
  const localOffset = date.getTimezoneOffset() * 60000;
  const utc = localTime + localOffset;
  const cityTime = utc + Timezone * 1000;
  const cityDate = new Date(cityTime);

  return cityDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
};
