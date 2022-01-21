import React, { useEffect, useState } from "react";
import { Buffer } from "buffer";
import { ResultPage } from "./ResultPage";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

interface IQuestionData {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: Array<string>;
  question: string;
  type: string;
}

interface Props {
  gameData: Array<any>;
}

const convertFromBase64 = (text: string) => {
  return Buffer.from(text, "base64").toString("utf8");
};

// TODO: randomize questions so the correct one is not always at the same place
// TODO: showResult make the correct one green and the rest red

export function GameScreen({ gameData }: Props) {
  const [currentQuestionId, setCurrentQuestionId] = useState(0);
  const [currentQuestionData, setCurrentQuestionData] = useState<IQuestionData>(gameData[currentQuestionId]);
  const [possibleAnswers, setPossibleAnswers] = useState<Array<string>>([]);
  const [possibleAnswersLoaded, setPossibleAnswersLoaded] = useState<boolean>(false);
  const [showResultPage, setShowResultPage] = useState<boolean>(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showResult, setShowResult] = useState<boolean>(false);

  useEffect(() => {
    setPossibleAnswers((prevArrState) => [...prevArrState, currentQuestionData.correct_answer]);
    currentQuestionData.incorrect_answers.forEach((a) => {
      setPossibleAnswers((prevArrState) => [...prevArrState, a]);
    });
    setPossibleAnswersLoaded(true);
    setCurrentQuestionId((prevCurrentQuestionId) => prevCurrentQuestionId + 1);
  }, [currentQuestionData]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    if ((e.target as HTMLButtonElement).value === convertFromBase64(currentQuestionData.correct_answer)) {
      setCorrectAnswers(correctAnswers + 1);
    }
    setShowResult(true);
  };

  const handleNextQuestion = (e: React.MouseEvent<HTMLButtonElement>): void => {
    setShowResult(false);
    if (gameData.length > currentQuestionId) {
      setPossibleAnswers([]);
      setCurrentQuestionData(gameData[currentQuestionId]);
    } else {
      setShowResultPage(true);
    }
  };

  return (
    <>
      {!showResultPage ? (
        <div className="border-red-300 border-8 h-full flex-col flex items-center justify-center">
          <div
            className="w-full h-1/4 text-center justify-center flex
         flex-col text-3xl"
          >
            {possibleAnswersLoaded && convertFromBase64(currentQuestionData.question)}
          </div>
          <div className="w-full h-1/4 text-center justify-center flex flex-col text-3xl items-center">
            {showResult ? (
              <button className="bg-blue-500 hover:bg-blue-300 rounded text-lg p-2" onClick={handleNextQuestion}>
                Next Question
              </button>
            ) : (
              <CountdownCircleTimer
                size={80}
                isPlaying={!showResult}
                duration={7}
                colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                onComplete={() => setShowResult(true)}
                colorsTime={[7, 5, 2, 0]}
              >
                {({ remainingTime }) => remainingTime}
              </CountdownCircleTimer>
            )}
          </div>
          {!showResult ? (
            <div className="grid grid-cols-2 gap-4 border-red-300 h-full w-full p-2">
              {possibleAnswersLoaded &&
                possibleAnswers.map((a, idx) => (
                  <button
                    type="submit"
                    name={a}
                    className="bg-blue-500 hover:bg-blue-300 rounded text-5xl p-6"
                    key={idx}
                    onClick={(e) => handleClick(e)}
                    value={convertFromBase64(a)}
                  >
                    {convertFromBase64(a)}
                  </button>
                ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 border-red-300 h-full w-full p-2">
              {possibleAnswersLoaded &&
                possibleAnswers.map((a, idx) => (
                  <button
                    type="submit"
                    name={a}
                    className={
                      convertFromBase64(a) === convertFromBase64(currentQuestionData.correct_answer)
                        ? "bg-green-500 rounded text-5xl p-6"
                        : "bg-red-500 rounded text-5xl p-6"
                    }
                    key={idx}
                    onClick={(e) => handleClick(e)}
                    value={convertFromBase64(a)}
                  >
                    {convertFromBase64(a)}
                  </button>
                ))}
            </div>
          )}
        </div>
      ) : (
        <ResultPage correctAnswers={correctAnswers} nbOfQuestions={gameData.length} />
      )}
    </>
  );
}
