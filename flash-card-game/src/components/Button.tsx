import React from "react";

import { Props } from "../interfaces";

const Button: React.FC<Props> = (props) => {
  return (
    <>
      <button
        type="button"
        className="my-3 w-72 mx-auto justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        onClick={props.onClick}
      >
        {props.children}
      </button>
    </>
  );
};

export default Button;
