import React, { useState, useEffect } from "react";
import TextBox from "../components/TextBox";
import Button from "../components/Button";

const GamePage: React.FC = () => {
  const [num1, setNum1] = useState<number>(0);
  const [num2, setNum2] = useState<number>(0);

  // function
  const setRandomNumbers = () => {
    setNum1(Math.round(Math.random() * 12));
    setNum2(Math.round(Math.random() * 12));
  };

  useEffect(() => {
    setRandomNumbers();
    console.log("test");
  }, []);
  return (
    <>
      <div className="border flex flex-col">

        <div className="border flex flex-row justify-around">
          <TextBox>{num1}</TextBox>
          <TextBox>x</TextBox>
          <TextBox>{num2}</TextBox>
          <TextBox>=</TextBox>
          <TextBox>{num1 * num2}</TextBox>
        </div>

        <Button>Enter</Button>

      </div>
    </>
  );
};

export default GamePage;
