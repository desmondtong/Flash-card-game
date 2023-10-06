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
      <div className="border flex flex-col">
        <p className="text-6xl text-center">EQUATIONS ATTEMPTED</p>

        <Button onClick={() => navigate("/")}>Main Menu</Button>

        {questionObj ? (
          <>
            <Button onClick={handleDelete}>Delete History</Button>

            <div className="border flex justify-center items-center">
              <table>
                <tbody>
                  <tr className="border">
                    <th className="border w-40">Nos.</th>
                    <th className="border w-40">Questions</th>
                    <th className="border w-40">Attemped</th>
                  </tr>

                  {questionArr.map((item, idx) => {
                    return (
                      <tr key={idx}>
                        <td className="text-center">{idx + 1}</td>
                        <td className="text-center">{item}</td>
                        <td className="text-center text-green-500">
                          {questionObj?.[item] && "Yes"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
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
