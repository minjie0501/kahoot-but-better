import { useEffect, useState } from "react";
import "./App.css";
import { CategoryScreen } from "./Components/CategoryScreen";
import { GameScreen } from "./Components/GameScreen";
import Navbar from "./Components/Navbar";

// TODO: create button component
function App() {
  const [categoryScreenToggle, setCategoryScreenToggle] = useState<boolean>(false);
  const [gameScreenToggle, setGameScreenToggle] = useState<boolean>(false);
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);
  const [gameQuestionsUrl, setGameQuestionsUrl] = useState("");

  const [categories, setCategories] = useState<any[]>([]);
  const [gameData, setGameData] = useState<any[]>([]);

  const getCategories = async (): Promise<Array<any>> => {
    const categoriesData = await fetch("https://opentdb.com/api_category.php");
    const categories = await categoriesData.json();
    return categories.trivia_categories;
  };

  useEffect(() => {
    (async () => {
      const categories = await getCategories();
      categories.unshift({ id: "null", name: "Any Category" });
      setCategories(categories);
    })();
  }, []);

  useEffect(() => {
    if (gameScreenToggle) {
      (async () => {
        const gameQuestionsData = await fetch(gameQuestionsUrl);
        const gameQuestions = await gameQuestionsData.json();
        setGameData(gameQuestions.results);
        setDataLoaded(true);
      })();
    }
  }, [gameQuestionsUrl, gameScreenToggle]);

  const handleHomeClick = (): void => {
    setCategoryScreenToggle(false);
    setGameScreenToggle(false);
    setDataLoaded(false);
  };
  const handleCategoryScreenToggle = (): void => setCategoryScreenToggle(true);

  const handleGameScreenToggle = (): void => {
    setCategoryScreenToggle(false);
    setGameScreenToggle(true);
  };

  return (
    <>
      <div className="flex flex-col h-screen bg-gray-500 ">
        <Navbar homeClick={handleHomeClick} />
        {categoryScreenToggle ? (
          <CategoryScreen
            categories={categories}
            handleGameScreenToggle={handleGameScreenToggle}
            setGameQuestionsUrl={setGameQuestionsUrl}
          />
        ) : gameScreenToggle ? (
          dataLoaded ? (
            <GameScreen gameData={gameData} />
          ) : (
            "Loading..."
          )
        ) : (
          <div className="border-red-300 border-8 h-full flex items-center justify-center">
            <button className="bg-blue-500 hover:bg-blue-200 rounded text-9xl p-6" onClick={handleCategoryScreenToggle}>
              Lets play
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
