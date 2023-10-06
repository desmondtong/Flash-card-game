import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import TextBox from "../components/TextBox";
import Button from "../components/Button";
import ModalWindow from "../components/ModalWindow";

const GamePage: React.FC = () => {
  const navigate = useNavigate();
  const operators = ["+", "-", "*", "/"];
  const gameTime = 5;

  const [num1, setNum1] = useState<number>(0);
  const [num2, setNum2] = useState<number>(0);
  const [operator, setOperator] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

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

  const checkAnswer = () => {
    const equation =
      Math.round(eval(`${num1} ${operator} ${num2}`) * 100) / 100;
    if (Number(inputRef.current?.value) == equation) {
      setQuestion();
      updateScore();
    } else {
      alert("Wrong answer! Please try again!");
      updateScore(false);
    }
  };

  const handleRestart = () => {
    // add popup to confirm restart?
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
  }, []);
  return (
    <>
      <div className="border flex flex-col">
        <div className="flex flex-col justify-center my-5">
          <div className="flex flex-row justify-between items-center">
            <div className="border basis-1/6"></div>
            <p className="text-7xl border flex-1 text-center">{time}</p>
            <button className="border basis-1/12" onClick={handleRestart}>
              restart
            </button>
            <button className="border basis-1/12" onClick={() => navigate("/")}>
              home
            </button>
          </div>
        </div>

        <p className="border text-center text-2xl">Current score</p>
        <p className="text-7xl border self-center w-40 text-center">{score}</p>

        <div className="flex flex-row justify-around text-align">
          <TextBox>{num1}</TextBox>
          <TextBox>{operator === "*" ? "x" : operator}</TextBox>
          <TextBox>{num2}</TextBox>
          <TextBox>=</TextBox>
          <input
            className="border w-44 h-44 text-8xl"
            ref={inputRef}
            disabled={isDisabled}
          ></input>
        </div>
        <p className="text-sm italic text-right mx-5">
          Provide answer to <span className="font-bold">2 d.p</span>, if
          applicable
        </p>
        <Button onClick={checkAnswer} isDisabled={isDisabled}>
          Enter
        </Button>
      </div>

      <ModalWindow
        openModal={openModal}
        setOpenModal={setOpenModal}
        btn1Navigate={() => navigate("/scoreboard")}
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
