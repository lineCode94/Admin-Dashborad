import { Badge, Card, CardBody, Button } from "@windmill/react-ui";
import React from "react";
import { useParams } from "react-router-dom";
import { IoAdd } from "react-icons/io5";
import { FiTrash2 } from "react-icons/fi";
import Tooltip from "../../components/tooltip/Tooltip";
import useAsync from "../../hooks/useAsync";
import "react-slideshow-image/dist/styles.css";
import { Fade } from "react-slideshow-image";
import Loading from "../../components/preloader/Loading";
import PageTitle from "../../components/Typography/PageTitle";
import ProductServices from "../../services/ProductServices";
import { notifySuccess, notifyError } from "../../utils/toast";
import ProductImagesSlider from "../../components/product-images-slider/index";
import { useGetDomain } from "../../hooks/useGetDomain";
import { useHistory } from "react-router-dom";
import "swiper/swiper.min.css";
import "swiper/modules/pagination/pagination.min.css";
const ProductDetails = () => {
  const history = useHistory();
  const { id } = useParams();
  const domain = useGetDomain();
  console.log(id, domain);
  //   const { handleUpdate } = useToggleDrawer();
  const { data, loading } = useAsync(() =>
    ProductServices.getProductById(id, domain)
  );
  const singleProduct = data.data;
  console.log(singleProduct?.title);

  return (
    <>
      {/* <MainDrawer>
        <ProductDrawer id={id} />
      </MainDrawer> */}

      <PageTitle arrow={true}>Product Details</PageTitle>
      {loading ? (
        <Loading loading={loading} />
      ) : (
        <>
          <Card className="flex mt-8 p-2 flex-col md:flex-row bg-white">
            {/* <div
            style={{ width: "507px", marginRight: "80px", marginLeft: "45px" }}
            className="slide-container"
          >
            <Fade autoplay={false}>
              {singleProduct?.image.map((img, i) => (
                <Card>
                  <div key={i}>
                    <img
                      className="w-full h-64"
                      src={img.image_url}
                      alt={img.title}
                    />
                  </div>
                </Card>
              ))}
            </Fade>
          </div> */}
            <Card style={{ width: "700px" }}>
              <ProductImagesSlider singleProduct={singleProduct} />
            </Card>
            <div className="inline-block overflow-y-auto h-full align-middle transition-all transform">
              <div className="flex flex-col lg:flex-row md:flex-row w-1/2 overflow-hidden">
                <div className="flex-shrink-0 flex items-center justify-center h-auto">
                  {/* {singleProduct?.image.map((img) => (
                  <img
                    className="w-full h-64"
                    src={img.image_url}
                    alt={img.title}
                  />
                ))} */}
                </div>
              </div>
            </div>
            <CardBody className="ml-2 flex flex-col w-full">
              <div className="w-full flex flex-row-reverse p-2 ">
                <div
                  onClick={() => {
                    ProductServices.deleteProduct(id, domain).then((res) => {
                      if (res) {
                        notifySuccess(res.msg);
                        history.push("/products");
                      }
                    });
                  }}
                  className="p-2 cursor-pointer text-gray-400 hover:text-red-600"
                >
                  <Tooltip
                    id="delete"
                    Icon={FiTrash2}
                    title="Delete"
                    bgColor="#EF4444"
                  />
                </div>
              </div>
              <div className="pb-2 flex space-x-4 items-center">
                <Badge type="warning">
                  <span className="p-1">
                    Status:{" "}
                    {singleProduct.is_published ? "Published" : "Not Published"}
                  </span>
                </Badge>
              </div>
              <p className="mb-4 font-bold text-gray-800 dark:text-gray-300 text-2xl">
                {singleProduct.title}
              </p>
              <div className="pb-2 flex space-x-4 items-center">
                {/* <p className="text-black dark:text-white">
                children: {myData?.sub_categories?.length}
              </p> */}
                {/* <p className="text-black dark:text-white">
                Products: {singleProduct?.products_count}
              </p> */}
                <p className="text-black dark:text-white">
                  SKU: {singleProduct.variations.map((sku) => sku.sku)}
                </p>
                <p className="text-black dark:text-white">
                  ID: {singleProduct.id}
                </p>
              </div>
              <div className="pb-2 flex space-x-4 items-center">
                <p className="text-black dark:text-white text-xl font-semibold">
                  {singleProduct.variations.map((price) => price.price)}
                  <span className="text-sm font-normal">KWD</span>
                </p>
                <p className="text-black dark:text-white">
                  Quantity:{" "}
                  {singleProduct.variations.map((q) => q.stock_quantity)}
                </p>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                {singleProduct.description}
              </p>
              <div className="pb-2 flex space-x-4 items-center">
                <p className="text-black dark:text-white">
                  Category:{" "}
                  {singleProduct.category.map((cat) => (
                    <span className="bg-gray-200 mr-2 border-0 text-gray-500 rounded-full inline-flex items-center justify-center px-2 py-1 text-xs font-semibold font-serif mt-2 dark:bg-gray-700 dark:text-gray-300">
                      {cat.title}
                    </span>
                  ))}
                </p>
              </div>
              <div>
                <p className="text-black dark:text-white">Sub Category: </p>
              </div>
              <div className="font-serif product-price dark:text-gray-400">
                <span className="inline-block font-bold  text-2xl">
                  {singleProduct.has_variation
                    ? ""
                    : singleProduct.variations.map((v) => (
                        <span className="text-2xl">
                          {v.price}
                          <span
                            style={{ fontSize: "13px", fontWeight: "normal" }}
                          >
                            {" "}
                            KWD
                          </span>
                        </span>
                      ))}{" "}
                  {/* {data.discount >= 1 && (
                    <del className="text-gray-400 dark:text-gray-500 text-lg pl-2">
                    ${data.originalPrice}
                    </del>
                )} */}
                </span>
              </div>

              <div className="flex mt-auto items-center justify-start   w-full  flex-row-reverse">
                <Button onClick={() => history.push(`/product/edit/${id}`)}>
                  Edit Product
                </Button>
                <Button className="mr-4">Add translation</Button>
              </div>
            </CardBody>
          </Card>
          <Card
            style={{
              height: "200px",
              marginTop: "100px",
              marginBottom: "100px",
            }}
          >
            <p className="mb-4 font-bold text-gray-800 dark:text-gray-300 text-lg mt-2 ml-2">
              Add-ons
            </p>
            <div className="flex mt-8 p-2 flex-col md:flex-row ">
              <div
                style={{ width: "50%", height: "48px" }}
                className="border  border-gray-300 p-2 flex rounded-lg"
              >
                <div className="w-1/2">addon:Cheese</div>
                <div className="w-1/2  ">Price:KWD</div>
              </div>

              {/* seperator */}
              <span
                style={{
                  marginLeft: "20px",
                  marginRight: "20px",
                  borderLeft: "1px solid #BCC6D2",
                  height: "150px",
                  marginTop: "-60px",
                }}
              ></span>
              <div
                style={{ width: "50%", height: "48px" }}
                className="border  border-gray-300 p-2 flex rounded-lg"
              >
                <div className="w-1/2">addon:Cheese</div>
                <div className="w-1/2  ">Price:KWD</div>
              </div>
            </div>
          </Card>
          <Card
            style={{
              height: "200px",

              marginBottom: "100px",
            }}
          >
            <p className="mb-4 font-bold text-gray-800 dark:text-gray-300 text-lg mt-2 ml-2">
              Availability in every location
            </p>
            <div className="flex mt-8 p-2 flex-col md:flex-row ">
              <div
                style={{ width: "50%", height: "48px" }}
                className="border  border-gray-300 p-2 flex rounded-lg"
              >
                <div className="w-1/2">Location 1</div>
              </div>

              {/* seperator */}
              <span
                style={{
                  marginLeft: "20px",
                  marginRight: "20px",
                  borderLeft: "1px solid #BCC6D2",
                  height: "150px",
                  marginTop: "-60px",
                }}
              ></span>
              <div
                style={{ width: "50%", height: "48px" }}
                className="border  border-gray-300 p-2 flex rounded-lg"
              >
                <div className="w-3/4 border-gray-300 p-2  rounded-lg">
                  Location 2
                </div>
              </div>
            </div>
          </Card>
        </>
      )}
    </>
  );
};

export default ProductDetails;
