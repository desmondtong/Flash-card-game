import React from "react";

import Button from "../components/Button";

const MainMenu: React.FC = () => {
  return (
    <>
      <div className="flex flex-col justify-center">
        <img src="https://images.squarespace-cdn.com/content/v1/57f030b95016e13a6d42e810/1593441107439-8FONYZW6S3O57RAN10G1/calculator-512.png" className="my-10 w-1/4 mx-auto"></img>
        <Button path={"/game-page"}>Start Game</Button>
        <Button path={"/scoreboard"}>Scoreboard</Button>
        <Button path={"/history"}>History</Button>
      </div>
    </>
  );
};

export default MainMenu;
