import React, { useContext, useEffect, useState } from "react";
import PageTitle from "../components/Typography/PageTitle";
import { Button } from "@windmill/react-ui";
import { useForm } from "react-hook-form";
import { notifyError, notifySuccess } from "../utils/toast";
import AddonsServices from "../services/AddonsServices";

import { AiOutlineClose } from "react-icons/ai";
import { useHistory, useParams } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";
import { useGetDomain } from "../hooks/useGetDomain";
const EditAddon = () => {
  const [data, setData] = useState(null);
  const { addonId } = useParams();
  const { state } = useContext(AdminContext);
  const domain = useGetDomain();
  const { handleSubmit, reset, register, setValue } = useForm({
    defaultValues: {},
  });
  const history = useHistory();
  //   setting the default values
  useEffect(() => {
    AddonsServices.getAddonById(addonId, domain).then(({ data }) => {
      setData(data);
      setValue("title", data?.title);
      setValue("price", data?.price);
    });
  }, [addonId, domain]);

  const handleAddonSubmit = async (data) => {
    // console.log("handel", data, addonId);
    const res = await AddonsServices.updateAddon(addonId, data);

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
      onSubmit={handleSubmit(handleAddonSubmit)}
      className="flex flex-col justify-start"
    >
      <div className="max-w-screen-md  w-full mx-auto">
        <PageTitle arrow={true}>Edit addon</PageTitle>
      </div>
      {/* Media card */}
      <div className="container max-w-screen-md p-6 mx-auto bg-white flex justify-center items-center  dark:bg-gray-800 dark:text-gray-200 rounded-lg">
        <div className="w-full "></div>
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
              Name
            </label>
            <input
              type="text"
              {...register("title", { required: true })}
              placeholder="Addon Name"
              className="h-12 text-base rounded-md p-2 dark:bg-gray-700 focus:outline-none block  border focus:ring-blue-500 w-full bg-gray-100  focus:bg-white dark:focus:border-blue-500"
            />
          </div>
          <div className="flex mb-2 flex-col space-y-3 w-full">
            <label
              className="text-gray-600  dark:text-gray-400 "
              htmlFor="title"
            >
              Price
            </label>
            <input
              type="number"
              {...register("price", { required: true })}
              placeholder="KWD 0.000"
              className="h-12 text-base rounded-md p-2 dark:bg-gray-700 focus:outline-none block  border focus:ring-blue-500 w-full bg-gray-100  focus:bg-white dark:focus:border-blue-500"
            />
            <input
              name="domain"
              type="text"
              style={{ display: "none" }}
              {...register("domain")}
              value={domain}
              placeholder="hidden"
              className="h-12 hidden text-base rounded-md p-2 dark:bg-gray-700 focus:outline-none block  border focus:ring-blue-500 w-full bg-gray-100  focus:bg-white dark:focus:border-blue-500"
            />
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

export default EditAddon;
