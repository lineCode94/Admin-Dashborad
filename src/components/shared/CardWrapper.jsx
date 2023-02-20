import { Card, CardBody } from "@windmill/react-ui";
import React from "react";

const CardWrapper = ({ children }) => {
  return (
    <Card colored className=" mt-4 h-full py-4 w-full overflow-visible">
      <CardBody className="mx-auto space-y-4 dark:bg-gray-800 bg-white flex justify-start items-center flex-col rounded-lg">
        {children}
      </CardBody>
    </Card>
  );
};

export default CardWrapper;
