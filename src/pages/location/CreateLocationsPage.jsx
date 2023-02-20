import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PageTitle from "../../components/Typography/PageTitle";
import { yupResolver } from "@hookform/resolvers/yup";
import { createLocationSchema } from "../../Validation/CreateLocation";
import countryService from "../../services/CountryServices";
import useAsync from "../../hooks/useAsync";
import RequestButton from "../../components/Btns/RequestButton";
import SelectComponent from "../../components/shared/SelectComponent";
import InputField from "../../components/shared/InputField";
import ErrorSpan from "../../components/shared/ErrorSpan";
import ManageShipping from "../../components/Branch/ManageShipping";
import { notifySuccess, notifyError } from "../../utils/toast";
import { locations } from "../../utils/locations";
import ManageDineInTables from "../../components/Branch/ManageDineInTables";
import { BooleanOptions } from "../../components/shared/BooleanSelect";
import CardWrapper from "../../components/shared/CardWrapper";
// import ManageShippingFee from "../../components/Branch/ManageShippingFee";
import { createRef } from "react";
import BranchLocation from "../../services/BranchLocationService";

const CreateLocationsPage = () => {
  const { data, loading } = useAsync(countryService.getAllCountries);
  // const loading = false;
  // For yes and no options only
  const {
    handleSubmit,
    register,
    formState: { errors },
    trigger,
    reset,
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(createLocationSchema),
    mode: "onChange",
    defaultValues: { delivery: [] },
    shouldFocusError: true,
  });
  const shipping = watch("shipping");
  const dine_in = watch("dine_in");
  const [submitting, setSubmitting] = useState(false);
  const [allLocations, setAllLocations] = useState(locations.data);
  useEffect(() => {
    if (!allLocations) {
      setAllLocations(data.data);
    }
  }, [loading, data, allLocations]);
  const formRef = createRef();
  // what happens on submit
  // we create the branch wait for response take branch is and the create the shipping fee array that's all
  const handleCreateLocation = async (data) => {
    const { delivery, ...branchBody } = data;
    let msg = "";
    setSubmitting(true);
    try {
      // Created Branch
      const resOne = await BranchLocation.createBranch(branchBody);
      msg = resOne.msg;
      console.log("create branch res", resOne);
      // Enable or disable shipping
      if (Boolean(Number(branchBody.shipping))) {
        const resTwo = await BranchLocation.createShippingFee({
          branch_id: `${resOne.data.id}`,
          delivery,
        });

        if (resTwo.status) {
          setSubmitting(false);
          notifySuccess(msg);
          notifySuccess(resTwo.msg);
          reset();
        }
      } else {
        notifySuccess(msg);
        setSubmitting(false);
        reset();
      }
    } catch (err) {
      notifyError(err.msg);
      setSubmitting(false);
    }
  };
  console.log("errors", errors);
  return (
    <>
      <div className="container  flex-col   max-w-screen-md p-6 mx-auto  flex justify-center items-center   dark:text-gray-200 rounded-lg">
        <form
          ref={formRef}
          onSubmit={handleSubmit(handleCreateLocation)}
          className="flex flex-col justify-start mt-2 w-full"
        >
          <div className="max-w-screen-md  w-full mx-auto">
            <PageTitle arrow={true}>Add New Location</PageTitle>
          </div>
          {/* Country,Governorate,City */}
          <CardWrapper>
            {/* Select country */}
            <SelectComponent
              watch={watch}
              checkBox={true}
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
              watch={watch}
              checkBox={true}
              options={
                allLocations?.find((c) => {
                  const id = watch("country_id");

                  return Number(id) === c.id;
                })?.governorate
              }
              getTitle={(opt) => opt.title}
              getValue={(opt) => Number(opt.id)}
              label="Governorate"
              register={register}
              registerName="governorate_id"
              col={true}
              error={errors.governorate_id}
              disabled={!watch("country_id")}
              placeholder="Select a Governorate"
            />
            {/* Select City */}
            <SelectComponent
              watch={watch}
              checkBox={true}
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
              error={errors.city_id}
            />
          </CardWrapper>
          {/* Name Address Phone-Number */}
          <CardWrapper>
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
          </CardWrapper>
          {/*  Dine in ,Pickable,Shipping */}
          <CardWrapper>
            <SelectComponent
              watch={watch}
              checkBox={true}
              getTitle={(opt) => opt.name}
              getValue={(opt) => opt.value}
              label="Pickable"
              options={BooleanOptions}
              placeholder=""
              register={register}
              registerName="pickable"
              col={false}
              // checkBox={true}
              // w="80px"
            />
            <SelectComponent
              watch={watch}
              checkBox={true}
              getTitle={(opt) => opt.name}
              getValue={(opt) => opt.value}
              label="Dine in"
              options={BooleanOptions}
              placeholder=""
              register={register}
              registerName="dine_in"
              col={false}
              // checkBox={true}
              // w="w-12"
            />
            <SelectComponent
              watch={watch}
              checkBox={true}
              getTitle={(opt) => opt.name}
              getValue={(opt) => opt.value}
              label="Shipping"
              options={BooleanOptions}
              placeholder=""
              register={register}
              registerName="shipping"
              col={false}
              // checkBox={true}
              // w="w-12"
            />
            <ErrorSpan error={errors.shipping} />
          </CardWrapper>
          {/* Manage tables number */}
          {dine_in === "1" && (
            <ManageDineInTables
              error={errors.number_of_tables}
              register={register}
            />
          )}
        </form>
        {/* Shipping fees manage*/}
        {shipping === "1" && (
          <>
            {/* DONE make sure the main shipping management component  work as needed*/}
            <ManageShipping
              submitting={submitting}
              loading={loading}
              locations={allLocations}
              MainWatch={watch}
              setValue={setValue}
            />
          </>
        )}
        {/* Separating into two forms to make sure we handle the shipping form without nesting inside the main form   */}
        <div className="flex max-w-screen-md w-full flex-row-reverse mx-auto py-4 ">
          <RequestButton
            loading={submitting}
            type="button"
            onClick={(e) => {
              trigger(undefined, { shouldFocus: true });
              formRef.current.dispatchEvent(
                new Event("submit", { bubbles: true, cancelable: true })
              );
            }}
            className="h-12 px-6"
          >
            Save
          </RequestButton>
        </div>
      </div>
    </>
  );
};
export default CreateLocationsPage;
