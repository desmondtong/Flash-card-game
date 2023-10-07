import React from "react";
import { useNavigate } from "react-router-dom";

import Button from "../components/Button";

const MainMenu: React.FC = () => {
  const navigate = useNavigate();

  const handleDisplayInstruction = () => {
    alert(`Welcome to the Math Flash Card Game!
    
    In this game, you'll find four challenging levels:
    
    - Level 1: Addition (+)
    - Level 2: Addition (+) and Subtraction (-)
    - Level 3: Addition (+), Subtraction (-) and Multiplication (x)
    - Level 4: Addition (+), Subtraction (-), Multiplication (x) and Division (/)
    
    You'll have 60s for each level to solve the math equations.
    Please round your answers to 2 d.p when necessary.`);
  };

  return (
    <>
      <div className="flex flex-col h-screen justify-center">
        <img
          src="https://images.squarespace-cdn.com/content/v1/57f030b95016e13a6d42e810/1593441107439-8FONYZW6S3O57RAN10G1/calculator-512.png"
          className="my-10 w-1/4 mx-auto"
        ></img>
        <Button onClick={() => navigate("/game-page")}>Start Game</Button>
        <Button onClick={() => navigate("/scoreboard")}>Scoreboard</Button>
        <Button onClick={() => navigate("/history")}>History</Button>
        <Button onClick={handleDisplayInstruction}>Instruction</Button>
      </div>
    </>
  );
};

export default MainMenu;
