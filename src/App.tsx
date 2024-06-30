import "./App.css";
import Header from "./components/header/Header";
import ThemeSwitch from "./components/layout/ThemeSwitch";
import Weather from "./components/weather/Weather";
import { CityProvider } from "./context/CityContext";

function App() {
  return (
    <CityProvider>
      <main className="flex flex-col gap-10 max-w-[550px] items-center mx-auto mt-6 md:mt-10 border-[1.4px] dark:border-[#333333] border-[#d4d4d4] p-4 md:p-6 rounded-md font-sans text-[#242424] dark:text-gray-50">
        <Header />
        <Weather />
        <ThemeSwitch />
      </main>
    </CityProvider>
  );
}

export default App;
