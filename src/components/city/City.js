import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import CityServices from "../../services/CityServices";

const City = ({ govId }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getCity = async () => {
      const data = await CityServices.getAllCities({ govId });
      setData(data.data);
    };
    if (govId !== "") {
      getCity();
    }
  }, [govId]);

  return (
    <>
      {data?.map((city) => (
        <option key={city.id} value={city.id}>
          {city.title}
        </option>
      ))}
    </>
  );
};

export default City;
