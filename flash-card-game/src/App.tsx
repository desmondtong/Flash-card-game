import React, { useState, useEffect } from "react";
import GameInfoContext from "./context/gameInfo";
import { Route, Routes } from "react-router-dom";
import MainMenu from "./pages/MainMenu";
import GamePage from "./pages/GamePage";
import Scoreboard from "./pages/Scoreboard";
import History from "./pages/History";
import { HistoryDetails, ScoreDetails } from "./interfaces";

const App: React.FC = () => {
  const [scoreboard, setScoreboard] = useState<ScoreDetails[]>([]);
  const [questionsHistory, setQuestionsHistory] = useState<HistoryDetails>({});

  const generateQuestionList = () => {
    let obj: HistoryDetails = {};
    const operators = ["+", "-", "*", "/"];

    for (const operator of operators) {
      for (let i = 0; i < 13; i++) {
        for (let j = 0; j < 13; j++) {
          obj[`${i} ${operator} ${j}`] = false;
        }
      }
    }
    setQuestionsHistory(obj);
  };

  useEffect(() => {
    generateQuestionList();
  }, []);
  return (
    <div className=" bg-sky-100">
      <GameInfoContext.Provider
        value={{
          scoreboard,
          setScoreboard,
          questionsHistory,
          setQuestionsHistory,
        }}
      >
        <Routes>
          <Route path="/" element={<MainMenu />} />
          <Route path="/game-page" element={<GamePage />} />
          <Route path="/scoreboard" element={<Scoreboard />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </GameInfoContext.Provider>
    </div>
  );
};

export default App;
