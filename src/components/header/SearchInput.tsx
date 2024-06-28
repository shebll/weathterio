import { useEffect, useRef, useState } from "react";
import { fetchCity, fetchCityByCoordinates } from "../../lib/api/cities";
import { useCity } from "../../context/CityContext";

export default function SearchInput() {
  const searchInput = useRef<HTMLInputElement | null>(null);
  const [input, setInput] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const { selectedCity, setSelectedCity } = useCity();

  useEffect(() => {
    if (searchInput.current) searchInput.current.focus();
  }, []);

  useEffect(() => {
    if (selectedCity) {
      setInput(selectedCity.name);
      setShowPopup(false);
    }
  }, [selectedCity]);

  const fetchCities = async (value: string) => {
    setLoading(true);
    setErrors([]);
    const data = await fetchCity(value);
    setLoading(false);
    if (data.length === 0) {
      setErrors((prev) => [...prev, "City Not Found"]);
    } else {
      setCities(data);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    if (value.trim() === "") {
      setShowPopup(false);
      setCities([]);
      return;
    }

    setShowPopup(true);

    const newTimeoutId = setTimeout(() => {
      fetchCities(value);
    }, 1000);

    setTimeoutId(newTimeoutId);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      fetchCities(input);
    }
  };

  const handleCityClick = (city: City) => {
    setSelectedCity(city);
    setCities([]);
    setShowPopup(false);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const cityData = await fetchCityByCoordinates(latitude, longitude);
        if (cityData) {
          setSelectedCity(cityData);
        }
      });
    }
  };
  return (
    <div className="relative flex items-center gap-1 ">
      <div className="rounded-md bg-gray-100 outline-[0.5px] outline-gray-200 py-2 px-4 flex gap-2 items-center">
        <img
          src="/search-light.png"
          alt="search light image"
          width={20}
          height={20}
        />
        <input
          ref={searchInput}
          id="cityName"
          name="cityName"
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          type="text"
          className="bg-transparent outline-none"
        />
      </div>
      <div className="relative inline-block group shrink-0">
        <button onClick={getCurrentLocation} className="z-10">
          <img
            src="/location-light.png"
            alt="location png"
            width={35}
            height={35}
            className="p-2 bg-gray-200 rounded-full"
          />
        </button>
        <div className="absolute right-[-30%] bottom-[140%]  transition-all ease-in-out duration-300 group-hover:bottom-full mb-2 opacity-0 group-hover:opacity-100 bg-black/85 text-white text-sm rounded-md px-2 py-1 w-max">
          Use Current Location
        </div>
      </div>
      {showPopup && (
        <div className="absolute max-h-64 overflow-auto rounded-md top-[104%] left-0 w-full bg-gray-100 flex flex-col gap-2">
          {loading ? (
            <>
              <p className="p-4">Loading ... </p>
            </>
          ) : (
            cities.map((city, index) => (
              <span
                className="px-4 py-2 text-gray-500 transition-all cursor-pointer hover:bg-gray-200 "
                key={index}
                onClick={() => handleCityClick(city)}
              >
                {city.name}
              </span>
            ))
          )}
        </div>
      )}
      {errors.length > 0 &&
        errors.map((error, index) => (
          <p className="text-red-500" key={index}>
            {error}
          </p>
        ))}
    </div>
  );
}
