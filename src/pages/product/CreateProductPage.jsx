import React from "react";
import { useForm } from "react-hook-form";
import CardWrapper from "../../components/shared/CardWrapper";
import PageTitle from "../../components/Typography/PageTitle";
import MediaImageUploader from "../../components/shared/MediaCard/MediaImageUploader";
import InputField from "../../components/shared/InputField";
import { Label } from "@windmill/react-ui";
import TextAreaComponent from "../../components/shared/TextArea";
import SelectComponent from "../../components/shared/SelectComponent";
import RequestButton from "../../components/Btns/RequestButton";
import { useState } from "react";
import { BooleanOptions } from "../../components/shared/BooleanSelect";
const CreateProductPage = () => {
  const {
    formState: { errors },
    control,
    register,
    handleSubmit,
    reset,
    watch,
  } = useForm();
  const [submitting, setSubmitting] = useState(false);
  const handleCreateProduct = () => {};
  return (
    <>
      <form
        onSubmit={handleSubmit(handleCreateProduct)}
        className="flex flex-col justify-start mt-"
      >
        <div className="container  flex-col   max-w-screen-md p-6 mx-auto  flex justify-center items-center   dark:text-gray-200 rounded-lg">
          <div className="max-w-screen-md  w-full mx-auto">
            <PageTitle arrow={true}>Add Product</PageTitle>
            <MediaImageUploader limit={4} />
            <CardWrapper>
              <InputField
                label={"Title"}
                placeholder="Product title"
                register={register}
                registerName="title"
                error={errors.title}
              />
              <TextAreaComponent
                placeholder="Product Description"
                label={"Description"}
                register={register}
                registerName="description"
              />
            </CardWrapper>

            <CardWrapper>
              <div className="flex w-full space-x-3 justify-between">
                <SelectComponent
                  getTitle={(opt) => opt.title}
                  getValue={(opt) => opt.id}
                  label="Category"
                  options={[]}
                  placeholder="Select category"
                  register={register}
                  registerName="category"
                  col={true}
                  error={errors.category}
                />

                <SelectComponent
                  getTitle={(opt) => opt.title}
                  getValue={(opt) => opt.id}
                  label="Sub-Category"
                  options={[]}
                  placeholder="Select sub-category"
                  register={register}
                  registerName="subcategory"
                  col={true}
                  error={errors.subCategory}
                />
              </div>
            </CardWrapper>

            <CardWrapper>
              <SelectComponent
                getTitle={(opt) => opt.title}
                getValue={(opt) => opt.id}
                label="Addons"
                options={[]}
                placeholder="Select Addons"
                register={register}
                registerName="addons"
                error={errors.addons}
              />
            </CardWrapper>
            <CardWrapper>
              <SelectComponent
                watch={watch}
                checkBox={true}
                getTitle={(opt) => opt.name}
                getValue={(opt) => opt.value}
                label="Available for pick up?"
                options={BooleanOptions}
                placeholder=""
                register={register}
                registerName="pickable"
                col={false}
              />
              <SelectComponent
                watch={watch}
                checkBox={true}
                getTitle={(opt) => opt.name}
                getValue={(opt) => opt.value}
                label="Does this product have variants?"
                options={BooleanOptions}
                placeholder=""
                register={register}
                registerName="dine_in"
                col={false}
              />
            </CardWrapper>
            <div className="flex max-w-screen-md w-full flex-row-reverse mx-auto py-4 ">
              <RequestButton
                loading={submitting}
                type="submit"
                className="h-12 px-6"
              >
                {" "}
                Add product
              </RequestButton>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateProductPage;
