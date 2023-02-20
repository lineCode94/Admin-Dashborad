import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

import Tooltip from "../tooltip/Tooltip";

const EditDeleteButton = ({ id, handleUpdate, handleModalOpen, title }) => {
  return (
    <>
      <div
        style={{ marginTop: "-18px" }}
        className="flex justify-end text-right mt-0"
      >
        <div
          onClick={() => handleUpdate(id)}
          className="p-2 cursor-pointer text-gray-400 hover:text-green-600"
        >
          <Tooltip id="edit" Icon={FiEdit} title="Edit" bgColor="#10B981" />
        </div>

        <div
          onClick={() => handleModalOpen(id, title)}
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
    </>
  );
};
const DeleteButton = ({ id, handleDelete, title }) => {
  // const fun = (id) => {
  //   console.log("first" + id);
  // };
  return (
    <>
      <div className="flex justify-end text-right">
        <div
          onClick={() => handleDelete(id, title)}
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
    </>
  );
};

export { EditDeleteButton, DeleteButton };
export default EditDeleteButton;
