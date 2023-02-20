import React from "react";
import { BiLeftArrowAlt } from "react-icons/bi";
import { useHistory } from "react-router-dom";
const PageTitle = ({ children, arrow = false }) => {
  const history = useHistory();
  return (
    <div className="flex my-6  space-x-3 items-center">
      {arrow ? (
        <span
          onClick={() => history.goBack()}
          className="p-1 bg-gray-200 dark:bg-gray-700 cursor-pointer rounded-md"
        >
          <BiLeftArrowAlt className="text-xl  font-bold text-gray-700 dark:text-gray-300 inline-block" />
        </span>
      ) : null}
      <h1 className=" text-lg font-bold text-gray-700 dark:text-gray-300 inline-block">
        {children}
      </h1>
    </div>
  );
};

export default PageTitle;
