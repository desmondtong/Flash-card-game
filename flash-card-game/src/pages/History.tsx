import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../components/Button";

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
      <div className="flex flex-col">
        <p className="text-6xl text-center">EQUATIONS ATTEMPTED</p>

        <Button onClick={() => navigate("/")}>Main Menu</Button>

        {questionObj ? (
          <>
            <Button onClick={handleDelete}>Delete History</Button>

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
          <p className="text-xl text-center my-10">No record!</p>
        )}
      </div>
    </>
  );
};

export default History;
