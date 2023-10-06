import React, { useEffect, useState } from "react";
import GameInfoContext from "./context/gameInfo";
import { Route, Routes } from "react-router-dom";
import MainMenu from "./pages/MainMenu";
import GamePage from "./pages/GamePage";
import Scoreboard from "./pages/Scoreboard";
import History from "./pages/History";
import { ScoreDetails } from "./interfaces";

const App: React.FC = () => {
  const [scoreboard, setScoreboard] = useState<ScoreDetails[]>([]);

  useEffect(() => {
    JSON.parse(localStorage.getItem("scoreboard")!) ||
      localStorage.setItem("scoreboard", JSON.stringify([]));
  }, []);
  return (
    <div>
      <GameInfoContext.Provider value={{ scoreboard, setScoreboard }}>
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
