import { useEffect, useState } from "react";
import "./App.css";
import {CategoryScreen} from "./Components/CategoryScreen";
import { GameScreen } from "./Components/GameScreen";
import Navbar from "./Components/Navbar";

function App() {
  const [categoryScreenToggle, setCategoryScreenToggle] = useState<boolean>(false);
  const [gameScreenToggle, setGameScreenToggle] = useState<boolean>(false);
  const [gameQuestionsUrl, setGameQuestionsUrl] = useState("");

  const [categories, setCategories] = useState<any[]>([]);
  const [questions, setQuestions] = useState<any[]>([]);

  const getCategories = async (): Promise<Array<any>> => {
    const categoriesData = await fetch("https://opentdb.com/api_category.php");
    const categories = await categoriesData.json();
    return categories.trivia_categories;
  };

  // const getQuestions = async (): Promise<Array<any>> => {
  //   const questionsData = await fetch("https://opentdb.com/api.php?amount=10&difficulty=easy&encode=base64");
  //   const questions = await questionsData.json();
  //   return questions.results;
  // };

  useEffect(() => {
    (async () => {
      const categories = await getCategories();
      // const questions = await getQuestions();
      categories.unshift({"id":"null", "name": "Any Category"})
      setCategories(categories);
      // setQuestions(questions);
    })();
  }, []);

  const handleHomeClick = (): void => {
    setCategoryScreenToggle(false);
    setGameScreenToggle(false);
  };
  const handleCategoryScreenToggle = (): void => setCategoryScreenToggle(true);

  const handleGameScreenToggle = (): void => {
    setCategoryScreenToggle(false);
    setGameScreenToggle(true);
  };

  return (
    <>
      {/* {questions.map((question) => (
      <div>{atob(question.question)}</div>
    ))} */}
      <div className="flex flex-col h-screen bg-gray-500 ">
        <Navbar homeClick={handleHomeClick} />
        {categoryScreenToggle ? (
          <CategoryScreen categories={categories} handleGameScreenToggle={handleGameScreenToggle} setGameQuestionsUrl={setGameQuestionsUrl}/>
        ) : gameScreenToggle ? (
          <GameScreen gameQuestionsUrl={gameQuestionsUrl}/>
        ) : (
          <div className="border-red-300 border-8 h-full flex items-center justify-center">
            <button className="bg-blue-500 hover:bg-blue-200 rounded  text-9xl p-6" onClick={handleCategoryScreenToggle}>
              Lets play
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
