import React, { useState } from "react";
import ImageChip from "./ImageChip";
import MediaInput from "./MediaInput";
const MediaImageUploader = ({ limit = 4 }) => {
  const [preViewImages, setPreViewImages] = useState([]);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  // useEffect(() => {
  //   if (images.length > limit) {
  //     images.pop();
  //     preViewImages.pop();
  //     if (images.length === limit)
  //       notifyError(`Can't upload more than ${limit} images.`);
  //   }
  // }, [images]);
  const onImageClick = (e, img) => {
    console.log("imageClicked");
    setSelectedImage(img.img);
  };
  const onClickClose = (e, img) => {
    if (selectedImage === img.img) {
      setSelectedImage(null);
      return;
    }
    // prevent triggering on image click by propagation
    e.stopPropagation();
    // filtering the clicked image
    setPreViewImages((old) => old.filter((image) => image.img !== img.img));
  };
  return (
    //  Media card
    // how should it behave?
    // limit
    // deselect select images  preview images  register results to upload
    <div className="container max-w-screen-md p-6 mx-auto bg-white flex justify-center items-center  dark:bg-gray-800 dark:text-gray-200 rounded-lg">
      <div
        className="min-h-64 dark:bg-gray-700 bg-gray-100 flex justify-center items-center flex-col
            rounded-lg w-full p-2 "
      >
        {!selectedImage ? (
          <MediaInput
            limit={limit}
            setImages={setImages}
            setPreViewImages={setPreViewImages}
            preViewImages={preViewImages}
          />
        ) : (
          <>
            <div className="w-full h-56  ">
              <ImageChip
                alt={"select Img"}
                image={selectedImage}
                selected={true}
                onClickClose={() => setSelectedImage(null)}
                onClickImage={() => {}}
              />
            </div>
          </>
        )}
        {preViewImages.length > 0 && (
          <>
            <div className="flex justify-around border-1 w-full mt-2 ">
              {preViewImages.map((img, index) => {
                return (
                  <ImageChip
                    alt={`image ${index + 1}`}
                    image={img.img}
                    onClickClose={(e) => onClickClose(e, img)}
                    onClickImage={(e) => onImageClick(e, img)}
                    key={img.name}
                  />
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MediaImageUploader;
