import React, { useEffect, useState } from "react";
import { CategoryScreenDropdown } from "./CategoryScreenDropdown";

interface ICategoryScreenProps {
  categories: Array<any>;
  handleGameScreenToggle: () => void;
  setGameQuestionsUrl: (url: string) => void;
}

export const CategoryScreen: React.FunctionComponent<ICategoryScreenProps> = ({
  categories,
  handleGameScreenToggle,
  setGameQuestionsUrl,
}) => {
  // NOTE: couldn't find API endpoint for getting the difficulties and the types so I just hard-coded them for now
  const difficulties: Array<any> = [
    { id: "any", name: "Any Difficulty" },
    { id: "easy", name: "Easy" },
    { id: "medium", name: "Medium" },
    { id: "hard", name: "Hard" },
  ];
  const questionTypes: Array<any> = [
    { id: "any", name: "Any Type" },
    { id: "multiple", name: "Multiple Choice" },
    { id: "boolean", name: "True / False" },
  ];

  const [numberOfQuestions, setNumberOfQuestions] = useState(5);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (parseInt(e.target.value) < 1) setNumberOfQuestions(1);
    else if (parseInt(e.target.value) > 50) setNumberOfQuestions(50);
    else setNumberOfQuestions(parseInt(e.target.value));
  };

  useEffect(() => {
    setSelectedCategory(categories[0].id);
    setSelectedDifficulty(difficulties[0].id);
    setSelectedType(questionTypes[0].id);
    // console.log(typeof(numberOfQuestions))
    // console.log(numberOfQuestions);
    // console.log(selectedCategory);
    // console.log(selectedDifficulty);
    // console.log(selectedType);
  }, []);

  const handleGame = () => {
    let gameUrl = "https://opentdb.com/api.php";
    gameUrl += `?amount=${numberOfQuestions}`;
    if(selectedCategory!=='null'){
      gameUrl += `&category=${selectedCategory}`;
    }
    if(selectedDifficulty !=='any'){
      gameUrl += `&difficulty=${selectedDifficulty}`;
    }
    if(selectedType !=='any'){
      gameUrl += `&type=${selectedType}`;
    }

    setGameQuestionsUrl(`${gameUrl}&encode=base64`);
    handleGameScreenToggle();
  };

  return (
    <>
      <label htmlFor="Number of Questions" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
        Number of Questions
      </label>
      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/ p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        type="number"
        min="1"
        step="1"
        value={numberOfQuestions}
        onChange={handleChange}
      />
      <CategoryScreenDropdown title="Select Category" options={categories} setter={setSelectedCategory} />
      <CategoryScreenDropdown title="Select Difficulty" options={difficulties} setter={setSelectedDifficulty} />
      <CategoryScreenDropdown title="Select Type" options={questionTypes} setter={setSelectedType} />
      <button onClick={handleGame}>Start the quiz</button>
    </>
  );
};
