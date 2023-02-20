import React from "react";

import useAsync from "../../hooks/useAsync";
import CategoryServices from "../../services/CategoryServices";
import { useGetDomain } from "./../../hooks/useGetDomain";

const ParentCategory = () => {
  const domain = useGetDomain();
  const {
    data: { data: newD },
  } = useAsync(CategoryServices.getAllCategory, { domain: domain }); //   console.log(value);
  return (
    <>
      {newD?.map((parent) => (
        <option key={parent.id} value={parent.parent}>
          {parent.parent}
        </option>
      ))}
    </>
  );
};

export default ParentCategory;
