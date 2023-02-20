import { Label } from "@windmill/react-ui";
import React from "react";

const TextAreaComponent = ({
  placeholder,
  label,
  registerName,
  register,
  rows = 4,
}) => {
  return (
    <>
      <Label className="w-full space-y-3">
        <span className="text-gray-600 text-base dark:text-gray-400 ">
          {label}
        </span>
        <textarea
          rows={rows}
          {...register(`${registerName}`, { required: true })}
          className="text-base rounded-md p-2 dark:bg-gray-700 focus:outline-none block  border focus:ring-blue-500 w-full bg-gray-100  focus:bg-white dark:focus:border-blue-500"
          placeholder={placeholder}
        ></textarea>
      </Label>
    </>
  );
};

export default TextAreaComponent;
