import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ScoreDetails } from "../interfaces";

import Button from "../components/Button";

const Scoreboard: React.FC = () => {
  const navigate = useNavigate();
  const [sortedScoreboard, setSortedScoreboard] = useState<ScoreDetails[]>([]);

  // sort scoreboard array based on score in descending order
  const sortScoreboard = () => {
    const scoreboardArr: ScoreDetails[] = JSON.parse(
      localStorage.getItem("scoreboard")!
    );
    if (scoreboardArr) {
      const sorted = scoreboardArr
        .sort((a, b) => {
          return b.score - a.score;
        })
        .slice(0, 5);
      setSortedScoreboard(sorted);
    }
  };

  const handleDelete = () => {
    setSortedScoreboard([]);
    localStorage.removeItem("scoreboard");
  };

  useEffect(() => {
    sortScoreboard();
  }, []);

  return (
    <>
      <div className="border flex flex-col">
        <p className="text-6xl text-center">TOP 5 HIGHSCORES</p>

        {/* show "No record!" if scoreboard history is deleted OR no records */}
        {!sortedScoreboard || sortedScoreboard.length == 0 ? (
          <p className="text-xl text-center my-10">No record!</p>
        ) : (
          <>
            <div className="border flex justify-center items-center">
              <table>
                <tbody>
                  <tr className="border">
                    <th className="border w-40">Ranking</th>
                    <th className="border w-40">Score</th>
                    <th className="border w-40">Level Cleared</th>
                  </tr>

                  {sortedScoreboard.map((item, idx) => {
                    return (
                      <tr key={idx}>
                        <td className="text-center">{idx + 1}</td>
                        <td className="text-center">{item.score}</td>
                        <td className="text-center">{item.level}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <Button onClick={handleDelete}>Delete History</Button>
          </>
        )}

        <Button onClick={() => navigate("/")}>Main Menu</Button>
      </div>
    </>
  );
};

export default Scoreboard;
