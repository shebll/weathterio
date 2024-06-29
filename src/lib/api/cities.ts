import axios, { AxiosError } from "axios";

export async function fetchCity(cityName: string) {
  try {
    const response = await axios.get<City[]>(
      `https://api.api-ninjas.com/v1/city?name=${cityName}&limit=30`,
      {
        headers: {
          "X-Api-Key": `${import.meta.env.VITE_CITIES_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.data.length == 0) throw new Error("No City Found");
    if (!response || !response.data || !isCityType(response.data[0])) {
      throw new Error("Invalid response format");
    }

    return response.data;
  } catch (error: unknown | AxiosError) {
    if (axios.isAxiosError(error)) {
      console.error("Error fetching cities data:", error.message);
      if (error.response) {
        console.error("Response data:", error.response.data.message);
      }
    } else {
      console.error("An unexpected error occurred:", error);
    }
    throw error;
  }
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

function isCityType(data: unknown): data is City {
  if (typeof data !== "object" || data === null) return false;

  const cityData = data as City;

  return (
    "country" in cityData &&
    typeof cityData.country === "string" &&
    "is_capital" in cityData &&
    typeof cityData.is_capital === "boolean" &&
    "latitude" in cityData &&
    typeof cityData.latitude === "number" &&
    "longitude" in cityData &&
    typeof cityData.longitude === "number" &&
    "name" in cityData &&
    typeof cityData.name === "string" &&
    "population" in cityData &&
    typeof cityData.population === "number"
  );
}
