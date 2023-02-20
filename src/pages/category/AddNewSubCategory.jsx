import React, { useState } from "react";
import PageTitle from "../../components/Typography/PageTitle";
import { useForm } from "react-hook-form";
import { notifyError, notifySuccess } from "../../utils/toast";
import CategoryServices from "../../services/CategoryServices";
import { AiOutlineClose } from "react-icons/ai";
import { useParams } from "react-router-dom";
import RequestButton from "../../components/Btns/RequestButton";
import { yupResolver } from "@hookform/resolvers/yup";
import CardWrapper from "../../components/shared/CardWrapper";
import InputField from "../../components/shared/InputField";
import TextAreaComponent from "../../components/shared/TextArea";
import { addNewSubCategory } from "../../Validation/Category";
const AddNewCategory = () => {
  const { id } = useParams();
  // TODO webpack error
  const [image, setImage] = useState(null);
  const [preViewImage, setPreViewImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addNewSubCategory(id)),
  });
  const resetImage = () => {
    setImage(null);
    setPreViewImage(null);
  };
  const [draggActive, setDragActive] = useState(false);
  const cancel = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };
  const activateDrag = (e) => {
    cancel(e);
    setDragActive(true);
  };
  const deActivateDrag = (e) => {
    cancel(e);
    setDragActive(false);
  };
  const handleImage = async (file) => {
    // set Image for preview
    setPreViewImage(URL.createObjectURL(file));

    // set Image for upload
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result);
    };
  };
  const handleDrop = (e) => {
    deActivateDrag(e);
    handleImage(e.dataTransfer.files[0]);
  };
  const handleAddCategorySubmit = async (data) => {
    if (!image) {
      data.image = null;
    } else {
      data.image = image;
    }
    setSubmitting(true);
    const res = await CategoryServices.addCategory(data);
    if (res.status) {
      notifySuccess("Sub-category created");
      setSubmitting(false);
      reset();
      resetImage();
    } else {
      notifyError(res.msg);
      setSubmitting(false);
    }
  };
  return (
    <div className="container  flex-col   max-w-screen-md p-6 mx-auto  flex justify-center items-center   dark:text-gray-200 rounded-lg">
      <form
        onSubmit={handleSubmit(handleAddCategorySubmit)}
        className="flex flex-col justify-start mt-2 w-full"
      >
        <div className=" w-full mx-auto">
          <PageTitle arrow={true}>Add New Sub-Category</PageTitle>
        </div>
        {/* Media card */}
        <div className=" bg-white flex justify-center items-center  dark:bg-gray-800 dark:text-gray-200 rounded-lg">
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
                  onChange={(e) => handleImage(e.target.files[0])}
                  type="file"
                  name="images"
                  id="category-images-upload"
                  accept=".png, .jpg, .jpeg"
                  multiple
                />
                <label
                  onDrop={handleDrop}
                  onDragOver={activateDrag}
                  onDragEnter={activateDrag}
                  onDragLeave={deActivateDrag}
                  onDropCapture={handleDrop}
                  htmlFor="category-images-upload"
                  className="w-[100%] h-56 dark:bg-gray-700 bg-gray-100 flex justify-center items-center flex-col border border-dashed rounded-lg"
                >
                  <p className="text-gray-700 dark:text-gray-300 text-lg">
                    Drag your image here
                  </p>
                  <p className="text-gray-400">
                    (only * jpg , * jpeg and* png images will be accepted)
                  </p>
                </label>
              </>
            )}
          </div>
        </div>
        {/* Title and ascription card */}
        <CardWrapper>
          <InputField
            label={"Title/Name"}
            placeholder="Category title"
            register={register}
            registerName="title"
            error={errors.title}
            type="text"
          />

          <TextAreaComponent
            label={"Description"}
            placeholder="Category Description..."
            register={register}
            registerName="description"
            rows={4}
          />
        </CardWrapper>
        <div className="flex w-full flex-row-reverse mx-auto py-4 ">
          <RequestButton
            loading={submitting}
            type="submit"
            className="h-12 px-6"
          >
            {" "}
            Save
          </RequestButton>
        </div>
      </form>
    </div>
  );
};

export default AddNewCategory;
