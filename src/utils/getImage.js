import noImage from "../assets/img/no-image.png";
export const getImage = (value) => {
  if (value) {
    return value;
  } else {
    return noImage;
  }
};
