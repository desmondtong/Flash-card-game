import React, { useState, useEffect, useRef } from "react";
import TextBox from "../components/TextBox";
import Button from "../components/Button";

const GamePage: React.FC = () => {
  const [num1, setNum1] = useState<number>(0);
  const [num2, setNum2] = useState<number>(0);
  const [score, setScore] = useState<number>(0);

  const inputRef = useRef<HTMLInputElement>(null);

  // function
  const setRandomNumbers = () => {
    setNum1(Math.round(Math.random() * 12));
    setNum2(Math.round(Math.random() * 12));
  };

  const updateScore = (isCorrect = true) => {
    if (isCorrect) {
      setScore(score + 1);
    } else {
      score && setScore(score - 1);
    }
  };

  const checkAnswer = () => {
    if (inputRef.current && Number(inputRef.current?.value) == num1 * num2) {
      setRandomNumbers();
      updateScore();

      inputRef.current.value = "";
      inputRef.current?.focus();
    } else {
      alert("Wrong answer! Please try again!");
      updateScore(false);

      inputRef.current?.focus();
    }
  };

  useEffect(() => {
    setRandomNumbers();
    inputRef.current?.focus();
  }, []);
  return (
    <>
      <div className="border flex flex-col">
        <div className="border my-10 flex justify-around">
          <TextBox>{score}</TextBox>
        </div>

        <div className="border flex flex-row justify-around text-align">
          <TextBox>{num1}</TextBox>
          <TextBox>x</TextBox>
          <TextBox>{num2}</TextBox>
          <TextBox>=</TextBox>
          <input className="border w-44 h-44 text-8xl" ref={inputRef}></input>
        </div>

        <Button onClick={checkAnswer}>Enter</Button>
      </div>
    </>
  );
};

export default GamePage;
