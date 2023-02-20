import React, { useContext, useState } from "react";
import PageTitle from "../components/Typography/PageTitle";
import { AdminContext } from "../context/AdminContext";
import { Button } from "@windmill/react-ui";
import { useForm } from "react-hook-form";
import { notifyError, notifySuccess } from "../utils/toast";
import * as yup from "yup";
import { AiOutlineClose } from "react-icons/ai";
import { RiAddFill } from "react-icons/ri";
import { BsSave2 } from "react-icons/bs";
import ReactChipInput from "react-chip-input";
import VariantsServices from "./../services/VariantsServices";
import SelectReact from "react-select";
import TagsInput from "./TagsInput";
import "../assets/css/custom.css";
import { createRef } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
const AddNewVariants = () => {
  // const selectedTags = (tags) => {
  //   console.log(tags);
  // };
  const [tags, setTags] = useState([]);
  const formRef = createRef();
  const { state } = useContext(AdminContext);
  const domain = state?.adminInfo?.data?.domain;
  // console.log(domain);
  const {
    handleSubmit,
    reset,
    register,
    trigger,
    setValue,

    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { values: [], title: "" },
    resolver: yupResolver(
      yup.object({
        title: yup.string().required(),
        values: yup.array().of(yup.string()).required(),
      })
    ),
  });

  // console.log("values", getValues());
  const handleVariantSubmit = async (data) => {
    // console.log(data);

    const res = await VariantsServices.addVariants(data);

    if (res.status) {
      console.log(res.msg);
      notifySuccess(res.msg);
      reset();
    } else {
      console.log(res.msg);

      notifyError(res.msg);
    }
  };

  return (
    <>
      <form
        ref={formRef}
        onSubmit={handleSubmit(handleVariantSubmit)}
        className="flex flex-col justify-start"
      >
        <div className="max-w-screen-md  w-full mx-auto">
          <PageTitle arrow={true}>Add New Variant</PageTitle>
        </div>

        {/* Title and ascription card */}
        <div className=" mt-4 h-full">
          <div
            className="p-8 mx-auto  container max-w-screen-md dark:bg-gray-800 bg-white flex justify-center items-center flex-col
            rounded-lg"
          >
            <div className="flex mb-2 flex-col space-y-3 w-full">
              <label
                className="text-gray-600  dark:text-gray-400 "
                htmlFor="title"
              >
                Option Name
              </label>
              <input
                name="title "
                type="text"
                {...register("title", { required: true })}
                placeholder="Color, Size, etc."
                className="h-12 text-base rounded-md p-2 dark:bg-gray-700 focus:outline-none block  border focus:ring-blue-500 w-full bg-gray-100  focus:bg-white dark:focus:border-blue-500"
              />
            </div>
            <div className="flex mb-2 flex-col space-y-3 w-full">
              <label
                className="text-gray-600  dark:text-gray-400 "
                htmlFor="variantTitle"
              >
                Values
              </label>

              <TagsInput watch={watch} setValue={setValue} />
            </div>
          </div>
        </div>
      </form>
      <div className="flex max-w-screen-md w-full flex-row-reverse mx-auto py-4 ">
        <Button
          onClick={(e) => {
            trigger(undefined, { shouldFocus: true });
            formRef.current.dispatchEvent(
              new Event("submit", { bubbles: true, cancelable: true })
            );
          }}
          className="h-12 px-6"
        >
          <span className="mr-2">
            <BsSave2 />
          </span>
          Save All
        </Button>
      </div>
    </>
  );
};

export default AddNewVariants;
