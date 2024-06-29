import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface CityContextType {
  selectedCity: City | null;
  setSelectedCity: (city: City | null) => void;
}

const CityContext = createContext<CityContextType | undefined>(undefined);

export const CityProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  useEffect(() => {
    if (!selectedCity) {
      const storedCity = localStorage.getItem("storedCity");
      if (storedCity) setSelectedCity(JSON.parse(storedCity) as City);
    } else {
      localStorage.setItem("storedCity", JSON.stringify(selectedCity));
    }
  }, [selectedCity]);

  return (
    <CityContext.Provider value={{ selectedCity, setSelectedCity }}>
      {children}
    </CityContext.Provider>
  );
};

export const useCity = () => {
  const context = useContext(CityContext);
  if (!context) {
    throw new Error("useCity must be used within a CityProvider");
  }
  return context;
};
