import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import GameInfoContext from "../context/gameInfo";
import { ArrowPathIcon, HomeIcon } from "@heroicons/react/20/solid";

import TextBox from "../components/TextBox";
import Button from "../components/Button";
import ModalWindow from "../components/ModalWindow";

const GamePage: React.FC = () => {
  const navigate = useNavigate();
  const gameCtx = useContext(GameInfoContext);

  const operators = ["+", "-", "*", "/"];
  const gameTime = 100;

  const [num1, setNum1] = useState<number>(0);
  const [num2, setNum2] = useState<number>(0);
  const [operator, setOperator] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  // answer message
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  // state for timer
  const [time, setTime] = useState<number>(gameTime);
  const [runTimer, setRunTimer] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  // function
  const initGameState = () => {
    setQuestion();
    setScore(0);

    setRunTimer(true);
    setTime(gameTime);

    setIsDisabled(false);
    inputRef.current?.focus();
  };

  const setQuestion = () => {
    setNum1(Math.round(Math.random() * 12));
    setNum2(Math.round(Math.random() * 12));
    setOperator(operators[Math.round(Math.random() * 3)]);
  };

  const updateScore = (isCorrect = true) => {
    if (isCorrect) {
      setScore(score + 1);
    } else {
      score && setScore(score - 1);
    }

    if (inputRef.current) inputRef.current.value = "";
    inputRef.current?.focus();
  };

  const handleShowMessage = (message: string) => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
    setMessage(message);
  };

  const checkAnswer = () => {
    const question = `${num1} ${operator} ${num2}`;
    const equation = Math.round(eval(question) * 100) / 100;
    setShowMessage(false);

    if (Number(inputRef.current?.value) == equation) {
      setQuestion();
      updateScore();

      // retrieve questionsHistory and update accordingly
      const questionsHistory = JSON.parse(
        localStorage.getItem("questionsHistory")!
      );
      questionsHistory[question] = true;
      localStorage.setItem(
        "questionsHistory",
        JSON.stringify(questionsHistory)
      );

      handleShowMessage("Correct! 🎉");
    } else {
      updateScore(false);
      handleShowMessage("Try again! 😅");
    }
  };

  const handleRestart = () => {
    // add popup to confirm r?
    initGameState();
  };

  // game timer
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (runTimer && time > 0) {
      intervalId = setInterval(() => {
        setTime((currState) => currState - 1);
      }, 1000);
    } else if (time === 0) {
      clearInterval(intervalId!);
      setIsDisabled(true);
      setOpenModal(true);
    }
    // clean up before starting new cycle
    return () => clearInterval(intervalId);
  }, [runTimer, time]);

  useEffect(() => {
    initGameState();

    //to make sure scoreboard array exist by creating one after deleted from history
    JSON.parse(localStorage.getItem("scoreboard")!) ||
      localStorage.setItem("scoreboard", JSON.stringify([]));

    JSON.parse(localStorage.getItem("questionsHistory")!) ||
      localStorage.setItem(
        "questionsHistory",
        JSON.stringify(gameCtx?.questionsHistory)
      );
  }, []);

  return (
    <>
      <div className="flex flex-col h-screen justify-center">
        <div className="flex flex-col justify-center my-5">
          <div className="flex flex-row justify-between items-center">
            <div className="basis-5/12"></div>
            <p className="text-7xl flex-1 text-center border-2 py-5">{time}</p>
            <div className="basis-5/12 flex justify-end gap-5 px-10">
              <button
                className="w-10 h-10 justify-center rounded-full bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                onClick={handleRestart}
              >
                <ArrowPathIcon className="text-gray-400" aria-hidden="true" />
              </button>
              <button
                className="w-10 h-10  justify-center rounded-full bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                onClick={() => navigate("/")}
              >
                <HomeIcon className="text-gray-400" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        <p className="text-center text-2xl">Current score</p>

        {/* only changes colour together with answer message */}
        <p
          className={`text-7xl self-center w-40 text-center ${
            showMessage
              ? message.includes("Correct")
                ? "text-green-400"
                : "text-red-400"
              : ""
          }`}
        >
          {score}
        </p>

        <div className="flex flex-row justify-around items-center text-align h-1/2">
          <TextBox>{num1}</TextBox>
          <TextBox>{operator === "*" ? "x" : operator}</TextBox>
          <TextBox>{num2}</TextBox>
          <TextBox>=</TextBox>
          <input
            className="border-2 w-60 h-44 text-8xl text-center"
            ref={inputRef}
            disabled={isDisabled}
          ></input>
        </div>

        <div
          className={`${
            showMessage ? "" : "invisible"
          } text-2xl text-center mx-5 font-medium ${
            message.includes("Correct") ? "text-green-400" : "text-red-400"
          }`}
        >
          {message}
        </div>

        <Button onClick={checkAnswer} isDisabled={isDisabled}>
          Enter Answer
        </Button>
        <p className="text-sm italic text-center mx-5 font-light text-gray-400">
          Provide answer to <span className="font-bold">2 d.p</span>, if
          applicable
        </p>
      </div>

      {/* popup window when game is over */}
      <ModalWindow
        openModal={openModal}
        setOpenModal={setOpenModal}
        btn1Navigate={() => navigate("/scoreboard")}
        score={score}
      >
        {[
          "Game Over!",
          "Press Continue to proceed to next level!",
          "Continue",
          "End Game",
        ]}
      </ModalWindow>
    </>
  );
};

export default GamePage;
