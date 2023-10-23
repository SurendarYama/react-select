import { Select } from "./components";

function App() {
  const options = ["Virat", "Yuvi", "Dhoni"];
  return (
    <div className="flex flex-col space-y-4 m-10">
      <Select options={options} />
    </div>
  );
}

export default App;
