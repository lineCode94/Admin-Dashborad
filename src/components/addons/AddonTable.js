import React, { useContext } from "react";
import { TableBody, TableRow, TableCell } from "@windmill/react-ui";
import MainModal from "../modal/MainModal";
// import ShowHideButton from "../table/ShowHideButton";
import useToggleDrawer from "../../hooks/useToggleDrawer";
import EditDeleteButton from "../table/EditDeleteButton";
import { useHistory } from "react-router-dom";
import { AdminContext } from "../../context/AdminContext";

const AddonTable = ({ addonss }) => {
  const { title, serviceId, handleModalOpen } = useToggleDrawer();
  const { state } = useContext(AdminContext);

  const history = useHistory();
  const handleOnClick = (id) => {
    history.push(`/addon/${id}`);
  };

  return (
    <>
      <MainModal id={serviceId} title={title} />

      <TableBody>
        {addonss?.map((addon) => (
          <TableRow
            key={addon.id}
            className="dark:hover:bg-gray-700 hover:bg-gray-200  "
          >
            <TableCell
              onClick={() => handleOnClick(addon.id)}
              className="font-semibold uppercase text-xs cursor-pointer"
            >
              {addon.id}
            </TableCell>

            <TableCell className="text-sm cursor-pointer ">
              {addon.title}
            </TableCell>

            <TableCell className="text-sm cursor-pointer ">
              {addon.price}
            </TableCell>

            <TableCell className="text-sm text-left"></TableCell>
            <TableCell>
              <EditDeleteButton
                id={addon.id}
                title={addon.title}
                handleUpdate={(id) => {
                  history.push(`/addon/edit/${id}`);
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

export default AddonTable;
