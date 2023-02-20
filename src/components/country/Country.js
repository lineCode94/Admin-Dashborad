import React from "react";
// import { useEffect } from "react";
// import { useState } from "react";
import useAsync from "../../hooks/useAsync";
import CountryServices from "./../../services/CountryServices";

const Country = () => {
  const { data } = useAsync(CountryServices.getAllCountries);
  // console.log("countries", data);
  return (
    <>
      {data.data?.map((Country) => (
        <option key={Country.id} value={Country.id}>
          {Country.country}
        </option>
      ))}
    </>
  );
};

export default Country;
