import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Card, CardBody } from "@windmill/react-ui";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import ManageDineInTables from "../../components/Branch/ManageDineInTables";
import ManageShipping from "../../components/Branch/ManageShipping";
import RequestButton from "../../components/Btns/RequestButton";
import ErrorSpan from "../../components/shared/ErrorSpan";
import InputField from "../../components/shared/InputField";
import SelectComponent from "../../components/shared/SelectComponent";
import PageTitle from "../../components/Typography/PageTitle";
import { Branch, locations } from "../../utils/locations";
import { createLocationSchema } from "../../Validation/CreateLocation";

const EditLocationPage = () => {
  const { id } = useParams();
  // For yes and no options only
  const boolOptions = [
    {
      name: "Yes",
      value: 1,
    },
    {
      name: "No",
      value: 0,
    },
  ];

  const [allLocations, setAllLocations] = useState(locations.data);
  const loading = false;
  const [submitting, setSubmitting] = useState(false);
  const {
    formState: { errors },
    register,
    reset,
    control,
    trigger,
    watch,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(createLocationSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: Branch.data,
    shouldFocusError: true,
  });
  const handleCreateLocation = (data) => {
    console.log(data);
  };
  const shipping = watch("shipping");
  const dine_in = watch("dine_in");

  return (
    <>
      {/* Testing only */}
      <h1>{id}</h1>
      {/*  */}
      <form
        onSubmit={handleSubmit(handleCreateLocation)}
        className="flex flex-col justify-start mt-"
      >
        <div className="container  flex-col   max-w-screen-md p-6 mx-auto  flex justify-center items-center   dark:text-gray-200 rounded-lg">
          <div className="max-w-screen-md  w-full mx-auto">
            <PageTitle arrow={true}>Edit Location</PageTitle>
          </div>
          {/* Country,Governorate,City */}
          <Card colored className=" mt-4 h-full py-4 w-full overflow-visible">
            <CardBody className="mx-auto space-y-4 dark:bg-gray-800 bg-white flex justify-center items-center flex-col rounded-lg">
              {/* Select country */}
              <SelectComponent
                options={allLocations}
                getTitle={(opt) => opt.country}
                getValue={(opt) => opt.id}
                label="Country"
                register={register}
                registerName="country_id"
                col={true}
                placeholder="Select a Country"
                error={errors.country_id}
              />
              {/* Select Governorate */}
              <SelectComponent
                options={
                  allLocations?.find((c) => {
                    const id = watch("country_id");

                    return Number(id) === c.id;
                  })?.governorate
                }
                getTitle={(opt) => opt.title}
                getValue={(opt) => opt.id}
                label="Governorate"
                register={register}
                registerName="governorate_id"
                col={true}
                disabled={!watch("country_id")}
                placeholder="Select a Governorate"
              />
              {/* Select City */}
              <SelectComponent
                options={
                  // Filter Country -> Gov -> City array
                  allLocations
                    ?.find((c) => {
                      const id = watch("country_id");
                      return Number(id) === c.id;
                    })
                    ?.governorate.find((g) => {
                      const id = watch("governorate_id");
                      return Number(id) === g.id;
                    })?.city
                }
                getTitle={(opt) => opt.title}
                getValue={(opt) => opt.id}
                label="City"
                register={register}
                registerName="city_id"
                col={true}
                disabled={!watch("governorate_id")}
                placeholder="Select a City"
              />
            </CardBody>
          </Card>
          {/* Name Address Phone-Number */}
          <Card colored className=" mt-4 w-full py-4 h-full overflow-visible">
            <CardBody
              className="p-8 mx-auto w-full container max-w-screen-md dark:bg-gray-800 bg-white flex justify-center items-center flex-col
          rounded-lg"
            >
              <InputField
                label="Name"
                register={register}
                registerName="title"
                placeholder="Location Name"
                error={errors.title}
              />
              <InputField
                label="Address"
                register={register}
                registerName="address"
                placeholder="Location Address"
                error={errors.address}
              />
              <InputField
                label="Phone"
                register={register}
                registerName="phone"
                placeholder="Location Phone"
                error={errors.phone}
              />
            </CardBody>
          </Card>
          {/*  Dine in ,Pickable,Shipping */}
          <Card colored className=" mt-4 w-full py-4 h-full overflow-visible">
            <CardBody
              className="p-8 mx-auto w-full container max-w-screen-md dark:bg-gray-800 bg-white flex justify-center items-center flex-col
          rounded-lg"
            >
              <SelectComponent
                getTitle={(opt) => opt.name}
                getValue={(opt) => opt.value}
                label="Pickable"
                options={boolOptions}
                placeholder=""
                register={register}
                registerName="pickable"
                col={false}
                // checkBox={true}
                // w="80px"
              />
              <SelectComponent
                getTitle={(opt) => opt.name}
                getValue={(opt) => opt.value}
                label="Dine in"
                options={boolOptions}
                placeholder=""
                register={register}
                registerName="dine_in"
                col={false}
                // checkBox={true}
                // w="w-12"
              />
              <SelectComponent
                getTitle={(opt) => opt.name}
                getValue={(opt) => opt.value}
                label="Shipping"
                options={boolOptions}
                placeholder=""
                register={register}
                registerName="shipping"
                col={false}
                // checkBox={true}
                // w="w-12"
              />
              <ErrorSpan error={errors.shipping} />
            </CardBody>
          </Card>
          {/* DONE add number field with value dine in table number  */}
          {dine_in === "1" && (
            <ManageDineInTables
              error={errors.dineTablesNumber}
              register={register}
            />
          )}
          {/* Shipping fees manage
          {shipping === "1" && (
            <ManageShipping
              control={control}
              errors={errors}
              loading={loading}
              locations={allLocations}
              watch={watch}
            />
          )} */}
          <div className="flex max-w-screen-md w-full flex-row-reverse mx-auto py-4 ">
            {/* TODO Addable or not yet to be decided !  */}
            {/* {shipping === 1 ||
              (shipping === "1" && (
                <Button className="ml-6">Edit Shipping</Button>
              ))} */}
            <RequestButton
              loading={submitting}
              type="submit"
              className="h-12 px-6"
            >
              {" "}
              Save
            </RequestButton>
          </div>
        </div>
      </form>
    </>
  );
};

export default EditLocationPage;
