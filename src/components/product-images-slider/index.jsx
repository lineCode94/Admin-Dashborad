import "./product-image-slider.scss";
import PropTypes from "prop-types";
import { Badge, Card, CardBody, Button } from "@windmill/react-ui";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";

import { Navigation, Thumbs } from "swiper";
import { useState } from "react";
// const slideImages = [
//   {
//     url: "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
//     caption: "Slide 1",
//   },
//   {
//     url: "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
//     caption: "Slide 2",
//   },
//   {
//     url: "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
//     caption: "Slide 3",
//   },
//   {
//     url: "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
//     caption: "Slide 3",
//   },
// ];
// console.log(slideImages.map((img) => img.url));
const ProductImagesSlider = ({ singleProduct }) => {
  const [activeThumb, setActiveThumb] = useState();

  return (
    <>
      <Card>
        <Swiper
          loop={true}
          spaceBetween={10}
          navigation={true}
          modules={[Navigation, Thumbs]}
          grabCursor={true}
          thumbs={{ swiper: activeThumb }}
          className="product-images-slider"
        >
          {singleProduct.image.map((item, index) => (
            <SwiperSlide key={index}>
              <img src={item.image_url} alt="product images" />
            </SwiperSlide>
          ))}
        </Swiper>
        <Swiper
          navigation={true}
          onSwiper={setActiveThumb}
          loop={true}
          spaceBetween={10}
          slidesPerView={4}
          modules={[Navigation, Thumbs]}
          className="product-images-slider-thumbs"
        >
          {singleProduct.image.map((item, index) => (
            <SwiperSlide key={index}>
              <img src={item.image_url} alt="product images" />
            </SwiperSlide>
            // <SwiperSlide key={index}>
            //   <div className="product-images-slider-thumbs-wrapper">
            //     <img
            //       style={{ height: "100%" }}
            //       src={item.url}
            //       alt="product images"
            //     />
            //   </div>
            // </SwiperSlide>
          ))}
        </Swiper>
      </Card>
    </>
  );
};

ProductImagesSlider.propTypes = {
  images: PropTypes.array.isRequired,
};

export default ProductImagesSlider;
