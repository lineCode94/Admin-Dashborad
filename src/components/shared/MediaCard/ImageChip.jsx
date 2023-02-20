import { AiFillCloseCircle } from "react-icons/ai";
import { MdOutlinePhotoSizeSelectLarge } from "react-icons/md";
const ImageChip = ({ image, alt, onClickClose, onClickImage, selected }) => {
  return (
    <>
      <div onClick={onClickImage} className="relative rounded-lg  h-full py-1">
        {selected ? (
          <MdOutlinePhotoSizeSelectLarge
            onClick={onClickClose}
            className={`mt-2 mr-2 text-xl absolute top-1 right-0 dark:text-gray-200 text-gray-500 cursor-pointer`}
          />
        ) : (
          <AiFillCloseCircle
            onClick={onClickClose}
            className={`mt-1 mr-1 absolute top-1 right-0 text-red-500 cursor-pointer`}
          />
        )}
        <img
          src={image}
          className={` min-w-20 rounded ${
            selected
              ? "object-cover h-full w-full"
              : "object-contain h-20 w-full"
          } `}
          alt={alt}
        />
      </div>
    </>
  );
};
export default ImageChip;
