import "./App.css";
import Header from "./components/header/Header";
import Weather from "./components/weather/Weather";
import { CityProvider } from "./context/CityContext";

function App() {
  return (
    <CityProvider>
      <main className="flex flex-col gap-10 max-w-[540px] items-center mx-auto mt-6 md:mt-10 border-[1.4px] p-4 md:p-6 rounded-md font-sans text-[#242424]">
        <Header />
        <Weather />
      </main>
    </CityProvider>
  );
}

export default App;
