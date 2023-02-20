import React from "react";
import { TableBody, TableRow, TableCell, Avatar } from "@windmill/react-ui";
import MainModal from "../modal/MainModal";
import ShowHideButton from "../table/ShowHideButton";
import useToggleDrawer from "../../hooks/useToggleDrawer";
import EditDeleteButton from "../table/EditDeleteButton";
import { useHistory } from "react-router-dom";
import { useGetDomain } from "../../hooks/useGetDomain";
import { getImage } from "../../utils/getImage";
const CategoryTable = ({ categories, isSub }) => {
  const { title, serviceId, handleModalOpen } = useToggleDrawer();
  const domain = useGetDomain();

  const history = useHistory();
  const handleOnClick = (id) => {
    if (isSub) {
      history.push(`/category/subCategory/${id}`);
    } else {
      history.push(`/category/${id}`);
    }
  };

  return (
    <>
      <MainModal id={serviceId} title={title} />

      <TableBody>
        {categories?.map((category) => (
          <TableRow
            key={category.id}
            className="dark:hover:bg-gray-700 hover:bg-gray-200  "
          >
            <TableCell
              onClick={() => handleOnClick(category.id)}
              className="font-semibold uppercase text-xs cursor-pointer"
            >
              {category.id}
            </TableCell>
            <TableCell
              onClick={() => handleOnClick(category.id)}
              className="hidden mr-3 md:block cursor-pointer"
            >
              <Avatar
                src={getImage(category.image?.image_url)}
                alt={category.title}
              />
            </TableCell>
            <TableCell
              onClick={() => handleOnClick(category.id)}
              className="text-sm cursor-pointer "
            >
              {category.title}
            </TableCell>

            {!isSub && (
              <TableCell
                className="font-medium text-sm"
                onClick={() => history.push(`/category/${category.id}`)}
              >
                <div className="flex flex-row flex-wrap max-w-sm items-center justify-start cursor-pointer">
                  {category?.sub_categories?.map((child, i) => {
                    if (i < 3) {
                      return (
                        <>
                          <span
                            key={i}
                            className="bg-gray-200 mr-2 border-0 text-gray-500 rounded-full inline-flex items-center justify-center px-2 py-1 text-xs font-semibold font-serif mt-2 dark:bg-gray-700 dark:text-gray-300"
                          >
                            {child.title}
                          </span>
                          {i === 2 ? "..." : null}
                        </>
                      );
                    } else {
                      return null;
                    }
                  })}
                </div>
              </TableCell>
            )}
            <TableCell className="text-sm text-left">
              {isSub
                ? category?.products_count || 0
                : category?.sub_categories?.length}
            </TableCell>
            <TableCell>
              <ShowHideButton
                domain={domain}
                id={category.id}
                status={Boolean(category.is_published)}
              />
            </TableCell>
            <TableCell>
              <EditDeleteButton
                id={category.id}
                title={category.title}
                handleUpdate={(id) => {
                  history.push(`/category/edit/${id}`);
                }}
                handleModalOpen={handleModalOpen}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default CategoryTable;
