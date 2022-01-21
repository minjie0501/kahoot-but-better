import React, { useEffect } from "react";

interface Props {
  gameData: Array<any>;
}

export function GameScreen({ gameData }: Props) {
  useEffect(() => {
    console.log(gameData);
  }, []);

  return <h1>asd</h1>;
}
