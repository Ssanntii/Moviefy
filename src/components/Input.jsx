import React from "react";

const Input = (props) => {
  return (
    <input
      type={props.type}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange ? (e) => props.onChange(e) : null}
      className="border-0 bg-black px-6 py-2 text-base rounded-lg text-gray-300 font-[var(--font-family)] focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 placeholder-gray-500"
    />
  );
};

export default Input;