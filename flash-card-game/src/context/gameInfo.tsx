import React from "react";
import { GameInfoContextType } from "../interfaces";

const GameInfoContext = React.createContext<GameInfoContextType | undefined>(
  undefined
);

export default GameInfoContext;
