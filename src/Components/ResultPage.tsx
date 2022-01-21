interface Props {
  correctAnswers: number;
  nbOfQuestions: number;
}

export function ResultPage({ correctAnswers, nbOfQuestions }: Props) {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="text-5xl">
        You got {correctAnswers} correct answers out of {nbOfQuestions} questions.
      </div>
    </div>
  );
}
