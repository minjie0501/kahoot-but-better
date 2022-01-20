import { useState } from "react";
import "./App.css";
import CategoryScreen from "./Components/CategoryScreen";
import Navbar from "./Components/Navbar";

function App() {
  const [categoryScreen, setCategoryScreen] = useState(false);

  const handleClick = (): void => {
    setCategoryScreen(!categoryScreen);
  };

  return (
    <>
      <div className="flex flex-col h-screen bg-gray-500 ">
        <Navbar homeClick={handleClick}/>
        {categoryScreen ? (
          <CategoryScreen />
        ) : (
          <div className="border-red-300 border-8 h-full flex items-center justify-center">
            <button className="bg-blue-500 hover:bg-blue-200 rounded  text-9xl p-6" onClick={handleClick}>
              Lets play
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
