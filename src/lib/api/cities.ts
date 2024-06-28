import axios from "axios";

export async function fetchCity(cityName: string) {
  const response = await axios.get(
    `https://api.api-ninjas.com/v1/city?name=${cityName}&limit=30`,
    {
      headers: {
        "X-Api-Key": `${import.meta.env.VITE_CITIES_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.data;
  return data;
}
