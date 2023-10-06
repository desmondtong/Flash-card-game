import React, { useContext } from "react";
import GameInfoContext from "../context/gameInfo";

const Scoreboard: React.FC = () => {
  const gameCtx = useContext(GameInfoContext);

  return <>{JSON.stringify(gameCtx?.scoreboard)}</>;
};

export default Scoreboard;
