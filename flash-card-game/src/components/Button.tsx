import React from "react";

import { Props } from "../interfaces";

const Button: React.FC<Props> = (props) => {
  return (
    <>
      <button
        type="button"
        className={
          props.isDisabled
            ? "my-3 w-72 mx-auto justify-center rounded-md bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
            : "my-3 w-72 mx-auto justify-center rounded-md bg-yellow-200 px-3 py-2 text-sm font-semibold text-gray-500 shadow-sm hover:bg-yellow-100"
        }
        onClick={props.onClick}
        disabled={props.isDisabled}
      >
        {props.children}
      </button>
    </>
  );
};

export default Button;
