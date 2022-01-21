import React from 'react';

interface Props {
    gameQuestionsUrl:string;
};

export function GameScreen({gameQuestionsUrl}: Props) {
  return <div>
      <p>{gameQuestionsUrl}</p>
      Questions here
  </div>;
}
