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

export async function fetchCityByCoordinates(
  latitude: number,
  longitude: number
) {
  const response = await axios.get(
    `https://api.api-ninjas.com/v1/city?min_lat=${latitude - 0.1}&max_lat=${
      latitude + 0.1
    }&min_lon=${longitude - 0.1}&max_lon=${longitude + 0.1}&limit=1`,
    {
      headers: {
        "X-Api-Key": `${import.meta.env.VITE_CITIES_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.length > 0 ? response.data[0] : null;
}
