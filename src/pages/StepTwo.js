import React from "react";
import Error from "../components/form/Error";
import InputArea from "../components/form/InputArea";
import { Select } from "@windmill/react-ui";
import Country from "../components/country/Country.js";
import Governorate from "../components/Governorate/Governorate";
import City from "../components/city/City.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import "../assets/css/custom.css";
import { Label, Button } from "@windmill/react-ui";
const StepTwo = ({ register, errors, loading }) => {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [governorate, setGovernorate] = useState("");
  // const typeOfBusisness = Object.freeze({
  //   shipping: "shipping",
  //   DineIn: "dine in ",
  //   pickUp:"pickUp"

  // });
  return (
    <>
      <div className="py-1">
        <h3 className="">Locations</h3>
        <p>You have to create at least one location to get started.</p>
      </div>

      <>
        <div className="row">
          <div className="col-6 ">
            <Select
              {...register("country_id")}
              onChange={(e) => {
                setCountry(e.target.value);
              }}
              name="country_id"
              label="country"
              className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
              style={{ fontSize: ".8rem" }}
            >
              <option value="All" defaultValue hidden>
                Country
              </option>
              <Country />
            </Select>
            <Error errorName={errors.country_id} />
          </div>
          {/* select gov */}
          <div className="col-6 ">
            {country ? (
              <>
                <Select
                  {...register("gov_id")}
                  name="gov_id"
                  style={{ fontSize: ".8rem" }}
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
                <Error errorName={errors.gov_id} />
              </>
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
        {/* <SelectLocation register={register} label="country" name="country_id" /> */}
      </>

      <div className="row">
        <div className="col-6  mt-4 ">
          {governorate ? (
            <>
              <Select
                name="city_id"
                {...register("city_id")}
                style={{ fontSize: ".8rem" }}
                onChange={(e) => setCity(e.target.value)}
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
              >
                <option value="All" defaultValue hidden>
                  City
                </option>
                <City govId={governorate} />
              </Select>
              <Error errorName={errors.city_id} />
            </>
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
        <div className="col-6  ">
          <label className="mb-2"> </label>

          <InputArea
            register={register}
            label="Location Number"
            name="branch_phone"
            type="text"
            placeholder="Location Number"
          />
          <Error errorName={errors.branch_phone} />
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-12 ">
          <label className="mb-2">Location name</label>
          <InputArea
            register={register}
            label="Location Name"
            name="title"
            type="text"
            placeholder="Location Name"
          />
          <Error errorName={errors.title} />
        </div>
      </div>
      <div className="row">
        <div className="col-12 ">
          <label className="mb-2">Address</label>
          <InputArea
            register={register}
            label="address"
            name="address"
            type="text"
            placeholder="Address"
          />
          <Error errorName={errors.address} />
        </div>
      </div>

      <h5 className="mt-4">Type of busisness</h5>
      <div className="mb-2 py-2">
        <Label className="mt-6 ml-2" check>
          <input
            {...register("pickable")}
            style={{ width: "20px", height: "20px" }}
            type="checkbox"
            name="pickable"
            value="1"
          />
          <span className="ml-2 text-lg">Pick up</span>
        </Label>
        <Label className="mt-6 ml-2" check>
          <input
            style={{ width: "20px", height: "20px" }}
            {...register("shipping")}
            type="checkbox"
            name="shipping"
            value="2"
          />
          <span className="ml-2 text-lg">Shipping</span>
        </Label>
        <Label className="mt-6 ml-2" check>
          <input
            style={{ width: "20px", height: "20px" }}
            {...register("dine_in")}
            type="checkbox"
            name="dine_in"
            value="3"
          />
          <span className="ml-2 text-lg">Dine in</span>
        </Label>
      </div>

      <Button
        disabled={loading}
        type="submit"
        className="border-0 text-black-50 mt-4 h-12 w-full text-xl  	  font-large bg-green-500 "
        to="/dashboard"
        style={{
          fontSize: "1.125rem",
          lineHeight: "1.75rem",
          fontWeight: "500",
        }}
      >
        Create your store
      </Button>
    </>
  );
};

export default StepTwo;
