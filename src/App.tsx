import "./App.css";
import Header from "./components/header/Header";
import { CityProvider } from "./context/CityContext";

function App() {
  return (
    <CityProvider>
      <main className="flex flex-col gap-20 items-center max-w-[660px] mx-auto mt-20 border-[1.4px] p-6 rounded-md font-sans text-[#242424]">
        <Header />
      </main>
    </CityProvider>
  );
}

export default App;
