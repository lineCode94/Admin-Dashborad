import React, { useContext, useLayoutEffect, useState } from "react";
import PageTitle from "../components/Typography/PageTitle";
import { Button } from "@windmill/react-ui";
import { useForm } from "react-hook-form";
import { notifyError, notifySuccess } from "../utils/toast";
import VariantsServices from "../services/VariantsServices";

// import { AiOutlineClose } from "react-icons/ai";
import { useHistory, useParams } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";
// import TagsInput from "./TagsInput";
import TagsInputEdit from "./TagsInputEdit";
import { useGetDomain } from "../hooks/useGetDomain";
const EditVariant = () => {
  const { id } = useParams();
  const [data, setData] = useState({ id, title: "", values: [] });
  const { state } = useContext(AdminContext);
  const domain = useGetDomain();
  console.log(domain);
  const { handleSubmit, reset, register, setValue, watch } = useForm({
    defaultValues: data,
  });
  const history = useHistory();
  //   setting the default values
  useLayoutEffect(() => {
    VariantsServices.getVariantsById(id).then(({ data }) => {
      console.log("response", data);
      // setData(data);
      // console.log("data", data);
      setValue("title", data?.title);
      setValue(
        "values",
        data?.values.map((v) => v.title)
      );
      // const defaultValues = {
      //   title: data.title,
      //   values: data.values.map((v) => v.title),
      // };
      // setData(defaultValues);
    });
  }, [id, domain]);

  const handleVariantSubmit = async (data) => {
    const res = await VariantsServices.updateVariants(id, data);
    console.log(data);
    if (res.status) {
      console.log(res);
      notifySuccess(res.msg);
      reset();
    } else {
      console.log(res);

      notifyError(res.msg);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleVariantSubmit)}
      className="flex flex-col justify-start"
    >
      <div className="max-w-screen-md  w-full mx-auto">
        <PageTitle arrow={true}>Edit variants</PageTitle>
      </div>
      {/* Media card */}

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
              type="text"
              {...register("title", { required: true })}
              className="h-12 text-base rounded-md p-2 dark:bg-gray-700 focus:outline-none block  border focus:ring-blue-500 w-full bg-gray-100  focus:bg-white dark:focus:border-blue-500"
            />
          </div>
          <div className="flex mb-2 flex-col space-y-3 w-full">
            <label
              className="text-gray-600  dark:text-gray-400 "
              htmlFor="title"
            >
              Values
            </label>
            <TagsInputEdit watch={watch} setValue={setValue} />
          </div>
        </div>
      </div>
      <div className="flex max-w-screen-md w-full flex-row-reverse mx-auto py-4 ">
        <Button type="submit" className="h-12 px-6">
          {" "}
          Save
        </Button>
      </div>
    </form>
  );
};

export default EditVariant;
