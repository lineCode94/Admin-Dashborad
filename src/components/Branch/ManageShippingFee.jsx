import { Card, CardBody, Input, Label } from "@windmill/react-ui";
import React from "react";
import { IoAdd } from "react-icons/io5";
import RequestButton from "../Btns/RequestButton";
import ErrorSpan from "../shared/ErrorSpan";
import SelectComponent from "../shared/SelectComponent";

const ManageShippingFee = ({ register, watch, locations, errors }) => {
  return (
    <>
      <Card colored className=" mt-4 h-full py-4 w-full overflow-visible">
        <CardBody className="mx-auto space-y-4 dark:bg-gray-800 bg-white flex  justify-start items-center flex-col rounded-lg">
          <div className="flex space-x-2 w-full">
            {/* Select country */}
            <SelectComponent
              checkBox={true}
              options={locations}
              getTitle={(opt) => opt.country}
              getValue={(opt) => opt.id}
              label="Countries you serve"
              register={register}
              registerName="shippingCountryId"
              col={true}
              placeholder="Select a Country"
              error={errors.shippingCountryId}
            />
            {/* Select Governorate */}
            <SelectComponent
              checkBox={true}
              options={
                locations?.find((c) => {
                  const id = watch("shippingCountryId");

                  return Number(id) === c.id;
                })?.governorate
              }
              getTitle={(opt) => opt.title}
              getValue={(opt) => Number(opt.id)}
              label="Governorates you serve"
              register={register}
              registerName="shippingGovernorateId"
              col={true}
              disabled={!watch("shippingCountryId")}
              placeholder="Select a Governorate"
              error={errors.shippingGovernorateId}
            />
          </div>
          <div className="flex space-x-2 w-full items-center ">
            {/* Select City */}
            <SelectComponent
              checkBox={true}
              options={
                // Filter Country -> Gov -> City array
                locations
                  ?.find((c) => {
                    const id = watch("shippingCountryId");
                    return Number(id) === c.id;
                  })
                  //   FIXME get all cities of one country
                  ?.governorate.map((g) => {
                    const id = watch("shippingGovernorateId");
                    if (id) {
                      return Number(id) === g.id;
                    } else {
                      return g;
                    }
                  })
                  ?.map((g) => g.city)
              }
              getTitle={(opt) => opt.title}
              getValue={(opt) => opt.id}
              label="City"
              register={register}
              registerName="shippingCityId"
              col={true}
              disabled={!watch("shippingCountryId")}
              placeholder="Select a City"
            />

            <div className="flex h-full flex-col space-y-2  w-full ">
              <Label htmlFor={"shippingFee"}>
                <span className="text-base font-normal text-gray-600 dark:text-gray-400">
                  Fee
                </span>
                <Input
                  placeholder={"Fee amount"}
                  disabled={!watch("shippingCountryId")}
                  type="text"
                  id={"shippingFee"}
                  {...register(`${"fee"}`, { required: true })}
                  className="h-12 mt-2 text-base rounded-md p-2 dark:bg-gray-700 focus:outline-none block  border focus:ring-blue-500 w-full bg-gray-100  focus:bg-white dark:focus:border-blue-500"
                />
                <ErrorSpan error={errors.fee} />
              </Label>
            </div>
          </div>
          <div className="flex max-w-screen-md w-full flex-row-reverse mx-auto py-4 ">
            <RequestButton
              //   loading={submitting}
              type="Button"
              // className="h-12 px-6"
              // className="h-12 px-4 w-1/2 mx-auto"
              className="w-full -mt-4  px-6 h-12 "
            >
              <IoAdd className="text-base" />
              Add Shipping
            </RequestButton>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default ManageShippingFee;
