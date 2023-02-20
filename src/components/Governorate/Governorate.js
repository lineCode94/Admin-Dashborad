import React from "react";

import GovernorateServices from "../../services/GovernorateServices";
import { useEffect } from "react";
import { useState } from "react";

const Governorate = ({ countryId }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getGov = async () => {
      const data = await GovernorateServices.getAllGovernorates({ countryId });
      setData(data.data);
    };
    if (countryId !== "") {
      getGov();
    }
  }, [countryId]);

  return (
    <>
      {data?.map((govern) => (
        <option key={govern.id} value={govern.id}>
          {govern.title}
        </option>
      ))}
    </>
  );
};

export default Governorate;
