export const getTempFromType = (rowTemp: number, tempType: "c" | "f") => {
  switch (tempType) {
    case "c":
      return (rowTemp - 273.15).toFixed(2);
    case "f":
      return (((rowTemp - 273.15) * 9) / 5 + 32).toFixed(2);
    default:
      return (rowTemp - 273.15).toFixed(2);
  }
};
