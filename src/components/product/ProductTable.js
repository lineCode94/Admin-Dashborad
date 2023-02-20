import React from "react";
import { Link } from "react-router-dom";
import {
  TableCell,
  TableBody,
  TableRow,
  Badge,
  Avatar,
} from "@windmill/react-ui";
import { FiZoomIn } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import Tooltip from "../tooltip/Tooltip";
import MainModal from "../modal/MainModal";
// import MainDrawer from "../drawer/MainDrawer";
// import ProductDrawer from "../drawer/ProductDrawer";
import ShowHideButton from "../table/ShowHideButton";
import EditDeleteButton from "../table/EditDeleteButton";
import useToggleDrawer from "../../hooks/useToggleDrawer";

const ProductTable = ({ products }) => {
  const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();
  const history = useHistory();
  const handleOnClick = (id) => {
    history.push(`/products/productDetalis/${id}`);
    // if (isSub) {

    // } else {
    //   history.push(`/category/${id}`);
    // }
  };
  return (
    <>
      <MainModal id={serviceId} title={title} />
      {/* <MainDrawer>
        <ProductDrawer id={serviceId} />
      </MainDrawer> */}
      <TableBody>
        {products?.data?.map((product, i) => (
          <TableRow key={i + 1}>
            <TableCell>
              <span className="text-xs uppercase font-semibold">
                {" "}
                {product.id}
                {/* {product._id.substring(18, 26)} */}
              </span>
            </TableCell>
            <TableCell>
              <div className="flex items-center">
                <Avatar
                  className="hidden p-1 mr-2 md:block bg-gray-50 shadow-none"
                  src={product.image.map((img) => img.image_url)}
                  // alt={product.title}
                />
                <div>
                  <h2 className="text-sm font-medium">{product.title}</h2>
                </div>
              </div>
            </TableCell>

            {product?.category?.map((child, i) => {
              if (i < 2) {
                return (
                  <>
                    <span
                      key={i}
                      className="  mr-2 border-0 text-gray-500 rounded-full inline-flex items-center justify-center px-2 py-1 text-xs font-semibold font-serif mt-2 dark:bg-gray-700 dark:text-gray-300"
                    >
                      {child.title}
                    </span>
                    {i === 1 ? "..." : null}
                  </>
                );
              } else {
                return null;
              }
            })}
            {/* {product.category.map((c) => (
              <>
                <TableCell>
                  <span className="text-sm">{c.title}</span>
                </TableCell>
              </>
            ))} */}
            {/* {product.category?.map((cate) => cate[0].id)} */}
            {/* {console.log(product.category.map((c) => c.title))} */}

            <TableCell>
              <span className="text-sm font-semibold">
                {product.min_price
                  ? `KWD ${product.min_price} - ${product.max_price}`
                  : ``}
              </span>
            </TableCell>
            <TableCell>
              {product.has_variation ? "" : ""}
              <span className="text-sm">
                {product.variations.map((q) => q.stock_quantity)}
              </span>
            </TableCell>
            <TableCell>{product.discount_price}</TableCell>
            {/* <TableCell>
              {product.quantity > 0 ? (
                <Badge type="success">Selling</Badge>
              ) : (
                <Badge type="danger">Sold Out</Badge>
              )}
            </TableCell> */}

            {/* <TableCell>
              <span className="text-sm font-semibold">
                {product.discount !== 0 && (
                  <span>{product.discount.toFixed(0)}% Off</span>
                )}
              </span>
            </TableCell> */}
            <TableCell>
              <Link
                onClick={() => handleOnClick(product.id)}
                className="flex justify-center text-center text-gray-400 hover:text-green-600"
              >
                <Tooltip
                  id="details"
                  Icon={FiZoomIn}
                  title="Details"
                  bgColor="#10B981"
                />
              </Link>
            </TableCell>
            <TableCell>
              <ShowHideButton
                id={product.id}
                status={Boolean(product.is_published)}
              />
              {console.log(product.is_published)}
            </TableCell>
            <TableCell>
              <EditDeleteButton
                id={product.id}
                title={product.title}
                handleUpdate={handleUpdate}
                handleModalOpen={handleModalOpen}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default React.memo(ProductTable);
