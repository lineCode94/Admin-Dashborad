import React, { useContext, useEffect, useState } from "react";
import PageTitle from "../../components/Typography/PageTitle";
import { Button } from "@windmill/react-ui";
import { useForm } from "react-hook-form";
import { notifyError, notifySuccess } from "../../utils/toast";
import CategoryServices from "../../services/CategoryServices";
import { AiOutlineClose } from "react-icons/ai";
import { useHistory, useParams } from "react-router-dom";
import { AdminContext } from "../../context/AdminContext";
import RequestButton from "../../components/Btns/RequestButton";
import { useGetDomain } from "../../hooks/useGetDomain";
import { getImage } from "../../utils/getImage";

const AddNewCategory = () => {
  const [image, setImage] = useState();
  const [data, setData] = useState(null);
  const [preViewImage, setPreViewImage] = useState(null);
  const { categoryId } = useParams();
  const [submitting, setSubmitting] = useState(false);
  const { state } = useContext(AdminContext);
  const domain = useGetDomain();
  const { handleSubmit, reset, register, setValue } = useForm({
    defaultValues: {},
  });
  const history = useHistory();
  //   setting the default values
  useEffect(() => {
    CategoryServices.getCategoryById(categoryId, domain).then(({ data }) => {
      setData(data);
      setPreViewImage(data.image.image_url);
      setImage(data?.image.image_url);
      setValue("description", data?.description);
      setValue("title", data?.title);
      setValue("image", getImage(data?.image.image_url));
    });
  }, [categoryId, domain]);
  const resetImage = () => {
    setImage(null);
    setPreViewImage(null);
  };

  const handleAddCategorySubmit = async (data) => {
    if (!image) {
      notifyError("Please provide an image");
    } else {
      if (image !== data.image.image_url) {
        data.image = image;
      }
      setSubmitting(true);
      const res = await CategoryServices.updateCategory(categoryId, data);

      if (res.status) {
        notifySuccess(res.msg);
        reset();
        resetImage();
        setSubmitting(false);
        history.push(`/category/${categoryId}`);
      } else {
        notifyError(res.msg);
        setSubmitting(false);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleAddCategorySubmit)}
      className="flex flex-col justify-start"
    >
      <div className="max-w-screen-md  w-full mx-auto">
        <PageTitle arrow={true}>
          {console.log(data)}
          {data?.parent_id ? "Edit Sub-Category" : "Edit Category"}
        </PageTitle>
      </div>
      {/* Media card */}
      <div className="container max-w-screen-md p-6 mx-auto bg-white flex justify-center items-center  dark:bg-gray-800 dark:text-gray-200 rounded-lg">
        <div className="w-full ">
          {preViewImage ? (
            <>
              <div className=" relative">
                <AiOutlineClose
                  onClick={resetImage}
                  className=" m-2 absolute top-0 right-0 text-red-500 text-xl cursor-pointer"
                />
                <img
                  src={preViewImage}
                  className="w-full object-cover h-64"
                  alt="preview"
                />
              </div>
            </>
          ) : (
            <>
              <input
                className="hidden"
                onChange={async (e) => {
                  const file = e.target.files[0];
                  // set Image for preview
                  setPreViewImage(URL.createObjectURL(file));

                  // set Image for upload
                  let reader = new FileReader();
                  reader.readAsDataURL(file);
                  reader.onload = () => {
                    setImage(reader.result);
                  };
                }}
                type="file"
                name="images"
                id="category-images-upload"
                accept=".png, .jpg, .jpeg"
                multiple
              />
              <label
                htmlFor="category-images-upload"
                className="w-[100%] h-56 dark:bg-gray-700 bg-gray-100 flex justify-center items-center flex-col
             border border-dashed rounded-lg"
              >
                <p className="text-gray-700 dark:text-gray-300 text-lg">
                  Drag your image here
                </p>
                <p className="text-gray-400">
                  (only * jpeg and* png images will be accepted)
                </p>
              </label>
            </>
          )}
        </div>
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
              Title/Name
            </label>
            <input
              type="text"
              {...register("title", { required: true })}
              placeholder="Category Title"
              className="h-12 text-base rounded-md p-2 dark:bg-gray-700 focus:outline-none block  border focus:ring-blue-500 w-full bg-gray-100  focus:bg-white dark:focus:border-blue-500"
            />
          </div>
          <div className="flex h-full flex-col space-y-2 mt-2 w-full ">
            <label
              className="text-gray-600 dark:text-gray-400 "
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              rows="4"
              {...register("description", { required: true })}
              className="text-base rounded-md p-2 dark:bg-gray-700 focus:outline-none block  border focus:ring-blue-500 w-full bg-gray-100  focus:bg-white dark:focus:border-blue-500"
              placeholder="Category Description..."
            ></textarea>
          </div>
        </div>
      </div>
      <div className="flex max-w-screen-md w-full flex-row-reverse mx-auto py-4 ">
        <RequestButton loading={submitting} type="submit" className="h-12 px-6">
          {" "}
          Save
        </RequestButton>
      </div>
    </form>
  );
};

export default AddNewCategory;
