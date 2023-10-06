import React from "react";
import { Props } from "../interfaces";

const TextBox: React.FC<Props> = (props) => {
  return (
    <>
      <div className="w-44 h-44 text-8xl flex justify-center items-center">
        {props.children}
      </div>
    </>
  );
};

export default TextBox;
