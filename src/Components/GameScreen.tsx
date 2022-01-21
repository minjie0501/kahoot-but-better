import React, { MouseEvent, useEffect, useState } from "react";
import { Buffer } from "buffer";

type IQuestionData = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: Array<string>;
  question: string;
  type: string;
};

interface Props {
  gameData: Array<any>;
}

export function GameScreen({ gameData }: Props) {
  const [currentQuestionId, setCurrentQuestionId] = useState(0);
  const [currentQuestionData, setCurrentQuestionData] = useState<IQuestionData>(gameData[currentQuestionId]);
  const [possibleAnswers, setPossibleAnswers] = useState<Array<string>>([]);
  const [possibleAnswersLoaded, setPossibleAnswersLoaded] = useState<boolean>(false);

  useEffect(() => {
    setPossibleAnswers((prevArrState) => [...prevArrState, currentQuestionData.correct_answer]);
    currentQuestionData.incorrect_answers.forEach((a) => {
      setPossibleAnswers((prevArrState) => [...prevArrState, a]);
    });
    setPossibleAnswersLoaded(true);
    setCurrentQuestionId((prevCurrentQuestionId) => prevCurrentQuestionId + 1);
  }, [currentQuestionData]);

  // TODO: last handleClick should take the user to the result page
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    setPossibleAnswers([]);
    setCurrentQuestionData(gameData[currentQuestionId]);
  };

  return (
    <>
      <div className="border-red-300 border-8 h-full flex-col flex items-center justify-center">
        <div
          className="w-full h-1/4 text-center justify-center flex
         flex-col text-3xl"
        >
          {possibleAnswersLoaded && Buffer.from(currentQuestionData.question, "base64").toString("utf8")}
        </div>
        <div className="grid grid-cols-2 gap-4 border-red-300 h-full w-full p-2">
          {possibleAnswersLoaded &&
            possibleAnswers.map((a, idx) => (
              <button
                type="submit"
                name={a}
                className="bg-blue-500 hover:bg-blue-200 rounded text-5xl p-6"
                key={idx}
                onClick={(e) => handleClick(e)}
                value={Buffer.from(a, "base64").toString("utf8")}
              >
                {Buffer.from(a, "base64").toString("utf8")}
              </button>
            ))}
        </div>
      </div>
    </>
  );
}
