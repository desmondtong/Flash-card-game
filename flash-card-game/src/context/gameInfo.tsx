import React from "react";
import { GameInfoContext } from "../interfaces";

const GameInfoContext = React.createContext<GameInfoContext | undefined>(
  undefined
);

export default GameInfoContext;
