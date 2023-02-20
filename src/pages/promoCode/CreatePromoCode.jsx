import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CardWrapper from "../../components/shared/CardWrapper";
import ErrorSpan from "../../components/shared/ErrorSpan";
import PageTitle from "../../components/Typography/PageTitle";
import InputField from "../../components/shared/InputField";
import DatePickerComponent from "../../components/shared/DatePicker";
import SelectComponent from "../../components/shared/SelectComponent";
import RequestButton from "../../components/Btns/RequestButton";
const CreatePromoCode = () => {
  const [submitting, setSubmitting] = useState(false);
  const orderTypes = [
    {
      name: "Shipping",
      id: 1,
    },
    {
      name: "Pick up",
      id: 2,
    },
    {
      name: "Dine in",
      id: 3,
    },
  ];
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm();
  const handleCreatePromoCode = (data) => {
    console.log(data);
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(handleCreatePromoCode)}
        className="flex flex-col justify-start mt-"
      >
        <div className="container  flex-col   max-w-screen-md p-6 mx-auto  flex justify-center items-center   dark:text-gray-200 rounded-lg">
          <div className="max-w-screen-md  w-full mx-auto">
            <PageTitle arrow={true}>Add New Location</PageTitle>
            <CardWrapper>
              <InputField
                label={"Campaign name"}
                placeholder="Campaign title"
                register={register}
                error={errors}
                registerName="ss"
              />
              <InputField
                label={"Campaign code"}
                placeholder="Campaign code"
                register={register}
                registerName="s"
                error={errors}
              />
            </CardWrapper>
            <CardWrapper>
              <DatePickerComponent
                control={control}
                label="Promo Code Validity Time"
                registerName={"date"}
                min={true}
              />
            </CardWrapper>
            <CardWrapper>
              <InputField
                label={"Discount Percentage"}
                placeholder="Discount Percentage"
                register={register}
                registerName="sk"
                error={errors}
              />
              <InputField
                label={"Minimum Amount"}
                placeholder="Minimum Amount"
                register={register}
                registerName="sf"
                error={errors}
              />
            </CardWrapper>
            <CardWrapper>
              <SelectComponent
                getTitle={(opt) => opt.name}
                label="Order Type"
                options={orderTypes}
                placeholder="Select type"
                register={register}
                registerName="orderType"
                getValue={(opt) => opt.id}
                col={true}
                error={errors}
              />
            </CardWrapper>
            <div className="flex max-w-screen-md w-full flex-row-reverse mx-auto py-4 ">
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
        </div>
      </form>
    </>
  );
};

export default CreatePromoCode;
