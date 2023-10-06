import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import MainMenu from "./pages/MainMenu";
import GamePage from "./pages/GamePage";
import Scoreboard from "./pages/Scoreboard";
import History from "./pages/History";
import { ScoreDetails } from "./interfaces";

const App: React.FC = () => {
  const [scoreboard, setScoreboard] = useState<ScoreDetails[]>([]);

  useEffect(() => {}, []);
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/game-page" element={<GamePage />} />
        <Route path="/scoreboard" element={<Scoreboard />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </div>
  );
};

export default App;
