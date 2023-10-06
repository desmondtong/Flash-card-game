import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ScoreDetails } from "../interfaces";
import { HomeIcon, TrashIcon } from "@heroicons/react/20/solid";

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
    //ADD POPUP WINDOW TO CONFIRM DELETE
    setSortedScoreboard([]);
    localStorage.removeItem("scoreboard");
  };

  useEffect(() => {
    sortScoreboard();
  }, []);

  return (
    <>
      <div className="border flex flex-col h-screen justify-center">
        <p className="text-6xl text-center h-1/6">Top 5 Highscores</p>

        {/* show "No record!" if scoreboard history is deleted OR no records */}
        {!sortedScoreboard || sortedScoreboard.length == 0 ? (
          <p className="text-xl h-1/2 flex items-center justify-center">
            No record!
          </p>
        ) : (
          <>
            <div className="flex flex-col items-center h-1/2">
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                  <div className="overflow-hidden">
                    <table className="text-center text-sm font-light">
                      <thead className="border-b font-medium dark:border-neutral-500">
                        <tr>
                          <th scope="col" className="px-6 py-4 w-40">
                            Ranking
                          </th>
                          <th scope="col" className="px-6 py-4 w-40">
                            Score
                          </th>
                          <th scope="col" className="px-6 py-4 w-40">
                            Level Cleared
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {sortedScoreboard.map((item, idx) => {
                          return (
                            <tr
                              key={idx}
                              className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500"
                            >
                              <td className="whitespace-nowrap px-6 py-4">
                                {idx + 1}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                {item.score}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                {item.level}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        <div className="flex justify-center gap-5">
          <button
            className="w-10 h-10 justify-center rounded-full bg-red-400 px-3 py-2 text-sm font-semibold shadow-sm hover:bg-red-300"
            onClick={handleDelete}
          >
            <TrashIcon className="text-white" aria-hidden="true" />
          </button>
          <button
            className="w-10 h-10 justify-center rounded-full bg-yellow-400 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-yellow-300"
            onClick={() => navigate("/")}
          >
            <HomeIcon className="text-gray-400" aria-hidden="true" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Scoreboard;
