import "./App.css";
import Navbar from "./Components/Navbar";

function App() {

  return (
    <>
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="w-full h-screen border-red-500">
          <h1 className="text-3xl font-bold underline">Hello world!</h1>
        </div>
      </div>
    </>
  );
}

export default App;
