import React, { useState, useEffect, useRef } from "react";
import TextBox from "../components/TextBox";
import Button from "../components/Button";

const GamePage: React.FC = () => {
  const [num1, setNum1] = useState<number>(0);
  const [num2, setNum2] = useState<number>(0);
  const [operator, setOperator] = useState<string>("");
  const [score, setScore] = useState<number>(0);

  const inputRef = useRef<HTMLInputElement>(null);

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
  };

  const checkAnswer = () => {
    const equation = eval(`${num1} ${operator} ${num2}`);
    if (inputRef.current && Number(inputRef.current?.value) == equation) {
      setQuestion();
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
    setQuestion();
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
          <TextBox>{operator}</TextBox>
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
