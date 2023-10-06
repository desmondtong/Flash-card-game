import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HomeIcon, TrashIcon } from "@heroicons/react/20/solid";

const History: React.FC = () => {
  const navigate = useNavigate();
  const [questionArr, setQuestionArr] = useState<string[]>([]);
  const questionObj = JSON.parse(localStorage.getItem("questionsHistory")!);

  const getHistory = () => {
    if (questionObj) {
      const arr = Object.keys(questionObj!);
      setQuestionArr(arr);
    }
  };

  const handleDelete = () => {
    //ADD POPUP WINDOW TO CONFIRM DELETE
    setQuestionArr([]);
    localStorage.removeItem("questionsHistory");
  };

  useEffect(() => {
    getHistory();
  }, []);
  return (
    <>
      <div className="flex flex-col h-screen justify-center">
        <p className="text-6xl text-center h-1/6">Game History</p>

        {questionObj ? (
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
                        {questionArr.map((item, idx) => {
                          return (
                            <tr
                              key={idx}
                              className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500"
                            >
                              <td className="whitespace-nowrap px-6 py-4">
                                {idx + 1}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                {item}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 text-green-500">
                                {questionObj?.[item] && "✅"}
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
        ) : (
          <p className="text-xl h-1/2 flex items-center justify-center">
            No record!
          </p>
        )}

        <div className="flex justify-center gap-5 mt-10">
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

export default History;
