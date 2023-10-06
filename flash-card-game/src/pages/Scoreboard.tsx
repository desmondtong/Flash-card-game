import React from "react";
import { ScoreDetails } from "../interfaces";

const Scoreboard: React.FC = () => {
  const scoreboard: ScoreDetails[] = JSON.parse(
    localStorage.getItem("scoreboard")!
  );
  // sort scoreboard array based on score in descending order
  const top5Scoreboard = scoreboard
    .sort((a, b) => {
      return b.score - a.score;
    })
    .slice(0, 5);
  return (
    <>
      <div className="border flex flex-col">
        <p className="text-6xl text-center">TOP 5 HIGHSCORES</p>

        <div className="border flex justify-center items-center">
          <table>
            <tbody>
              <tr className="border">
                <th className="border w-40">Ranking</th>
                <th className="border w-40">Score</th>
                <th className="border w-40">Level Cleared</th>
              </tr>

              {top5Scoreboard.map((item, idx) => {
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
      </div>
    </>
  );
};

export default Scoreboard;
