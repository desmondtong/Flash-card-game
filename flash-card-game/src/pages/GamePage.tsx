import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import TextBox from "../components/TextBox";
import Button from "../components/Button";

const GamePage: React.FC = () => {
  const navigate = useNavigate();

  const [num1, setNum1] = useState<number>(0);
  const [num2, setNum2] = useState<number>(0);
  const [operator, setOperator] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<HTMLParagraphElement>(null);

  const operators = ["+", "-", "*", "/"];

  // function
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

  const gameTimer = () => {
    let initTime = 5;
    const timer = timerRef.current;

    timer && (timer.textContent = initTime.toString());

    const interval = setInterval(() => {
      initTime--;
      timer && (timer.textContent = initTime.toString());

      if (initTime === 0) {
        clearInterval(interval);
        setIsDisabled(true);
      }
      //game over logic
    }, 1000);
  };

  useEffect(() => {
    setQuestion();
    setScore(0);
    gameTimer();
    inputRef.current?.focus();
  }, []);
  return (
    <>
      <div className="border flex flex-col">
        <p
          className="text-7xl border self-center my-3 w-40 text-center"
          ref={timerRef}
        ></p>

        <div className="flex flex-col justify-center">
          <div className="flex flex-row justify-between items-center">
            <div className="border basis-1/12"></div>
            <p className="border flex-1 text-center text-2xl">Current score</p>
            <button className="border basis-1/12" onClick={() => navigate("/")}>
              home
            </button>
          </div>

          <p className="text-7xl border self-center">{score}</p>
        </div>
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
    </>
  );
};

export default GamePage;
