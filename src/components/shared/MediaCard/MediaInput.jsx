import { useState } from "react";
import { notifyError } from "../../../utils/toast";
import styles from "./index.module.css";
const MediaInput = ({ limit, setPreViewImages, setImages, preViewImages }) => {
  const [dragActive, setDragActive] = useState(false);

  // Main logic and behavior control functions
  const handleImages = async (filesList) => {
    const files = Array.from(filesList);

    const newPreview = [];
    const newImages = [];
    if (files.length > limit || files.length + preViewImages.length > limit) {
      notifyError(`Can't upload more than ${limit} images.`);
      return;
    }
    for (let i = 0; i < files.length; i++) {
      //   console.log(files[i]);
      // name = img name + order
      const originName = files[i].name;
      const name = `${originName.split(".")[0]}-${i + 1}${
        originName.split(".")[1]
      }`;
      const img = URL.createObjectURL(files[i]);
      // TODO
      // Make sure this is not repeated image
      // if (
      //   preViewImages.includes(img) ||
      //   Boolean(newPreview.find((i) => i.img === img))
      // )
      //   continue;
      // push to preview
      newPreview.push({ name, img });
      // push to value
      let reader = new FileReader();
      reader.readAsDataURL(files[i]);
      reader.onload = () => {
        newImages.push({
          name,
          img: reader.result,
          originName,
        });
      };
    }

    // set Image for preview
    setPreViewImages((old) => [...old, ...newPreview]);
    // set Image for upload
    setImages((old) => [...old, ...newImages]);
  };
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
  const handleDrop = (e) => {
    deActivateDrag(e);
    handleImages(e.dataTransfer.files);
  };

  return (
    <>
      <input
        className="hidden"
        // onDrop={handleImages}
        onDrop={handleDrop}
        onDragOver={activateDrag}
        onDragEnter={activateDrag}
        onDragLeave={deActivateDrag}
        onDropCapture={handleDrop}
        onChange={(e) => handleImages(e.target.files)}
        // ref={inpRef}
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
        className={`border border-dashed border-gray-500 flex h-56 ${
          dragActive ? styles.add : null
        }        justify-center items-center w-full  rounded-md`}
        htmlFor="category-images-upload"
      >
        <div className="text-center">
          <p className="text-gray-700 dark:text-gray-300 text-lg ">
            Drag your image here
          </p>
          <p className="text-gray-400">
            (only * jpeg and* png images will be accepted)
          </p>
        </div>
      </label>
    </>
  );
};
export default MediaInput;
