import { useEffect, useRef, useState } from "react";
import { fetchCity } from "../../lib/api/cities";
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

  return (
    <div className="relative">
      <input
        ref={searchInput}
        id="cityName"
        name="cityName"
        value={input}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        type="text"
        className="border rounded-md bg-gray-100 outline-[0.5px] outline-gray-200 py-2 px-4"
      />
      {showPopup && (
        <div className="absolute max-h-64 overflow-auto rounded-md top-[104%] left-0 w-full bg-gray-100 flex flex-col gap-2">
          {loading ? (
            <>
              <p className="p-4">Loading ... </p>
            </>
          ) : (
            cities.map((city, index) => (
              <span
                className="text-gray-500 cursor-pointer hover:bg-gray-200 py-2 px-4 transition-all "
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
