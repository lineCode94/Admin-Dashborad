import React from "react";
import { Select } from "@windmill/react-ui";
import Country from "../country/Country.js";
import Governorate from "../Governorate/Governorate";
import City from "../city/City.js";
// import Error from '../components/form/Error';
// import LabelArea from '../components/form/LabelArea';
import { useState } from "react";
//  select country component
const SelectLocation = ({ register, name, label }) => {
  // const {   register, handleSubmit, errors, loading } =
  // useLoginSubmit();
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [governorate, setGovernorate] = useState("");

  return (
    <>
      {/* select country */}
      <form>
        <div className="row">
          <div className="col-6 ">
            <Select
              {...register(`${name}`, {
                required: `${label} is required!`,
              })}
              onChange={(e) => {
                setCountry(e.target.value);
              }}
              name={name}
              className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
            >
              <option value="All" defaultValue hidden>
                Country
              </option>
              <Country />
            </Select>
            {/* <Error errorName={errors.country} /> */}
          </div>
          {/* select gov */}
          <div className="col-6 ">
            {country ? (
              <Select
                {...register(`${name}`, {
                  required: `${label} is required!`,
                })}
                name={name}
                onChange={(e) => {
                  setGovernorate(e.target.value);
                }}
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
              >
                <option value="All" defaultValue hidden>
                  Governorate
                </option>
                <Governorate countryId={country} />
              </Select>
            ) : (
              <Select
                disabled
                onChange={(e) => {
                  setGovernorate(e.target.value);
                }}
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
              >
                <option value="All" defaultValue hidden>
                  Governorate
                </option>
                <Governorate countryId={country} />
              </Select>
            )}
          </div>
        </div>
        {/* select city */}
        <div className="row">
          <div className="col-6  mt-2 ">
            {governorate ? (
              <Select
                name={name}
                {...register(`${name}`, {
                  required: `${label} is required!`,
                })}
                onChange={(e) => setCity(e.target.value)}
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
              >
                <option value="All" defaultValue hidden>
                  City
                </option>
                <City govId={governorate} />
              </Select>
            ) : (
              <Select
                disabled
                onChange={(e) => setCity(e.target.value)}
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
              >
                <option value="All" defaultValue hidden>
                  City
                </option>
                <City govId={governorate} />
              </Select>
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default SelectLocation;
