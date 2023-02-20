import { TableBody, TableCell, TableRow } from "@windmill/react-ui";
import React from "react";
import { useHistory } from "react-router-dom";
import useToggleDrawer from "../../hooks/useToggleDrawer";
import MainModal from "../modal/MainModal";
import EditDeleteButton from "../table/EditDeleteButton";

const LocationTable = ({ locations }) => {
  const { title, serviceId, handleModalOpen } = useToggleDrawer();
  const history = useHistory();

  return (
    <>
      <MainModal id={serviceId} title={title} />

      <TableBody>
        {locations?.map((loc) => (
          <TableRow
            key={loc.id}
            className="dark:hover:bg-gray-700 hover:bg-gray-200  "
          >
            <TableCell className="font-semibold uppercase text-xs cursor-pointer">
              {loc.id}
            </TableCell>
            <TableCell className="hidden mr-3 md:block cursor-pointer">
              {loc.title}
            </TableCell>
            <TableCell className="text-sm cursor-pointer ">
              {loc.phone}
            </TableCell>

            <TableCell className="font-medium text-sm">
              <div className="flex flex-row flex-wrap max-w-sm items-center justify-start cursor-pointer">
                {loc.city.title}
              </div>
            </TableCell>

            <TableCell
              className="text-sm text-left "
              style={{ maxWidth: "200px" }}
            >
              <p className="truncate">{loc.address}</p>
            </TableCell>
            <TableCell>
              <EditDeleteButton
                id={loc.id}
                title={loc.title}
                handleUpdate={(id) => {
                  history.push(`/locations/edit/${id}`);
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

export default LocationTable;
