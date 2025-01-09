
import Inputs from "./components/Inputs";
import TimeAndLocation from "./components/TimeAndLocation";
import TopButtons from "./components/TopButtons";

const App = () => {
  return (
    <div className="mx-auto max-w-screen-lg mt-4 py-5 px-32 bg-gradient-to-br shadow-xl shadow-gray-400 from-cyan-600 to-blue-700">
      <TopButtons />
      <Inputs />

      <TimeAndLocation />
    </div>
  );
};

export default App;
