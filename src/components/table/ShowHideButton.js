import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { BsToggleOff, BsToggleOn } from "react-icons/bs";

import { notifySuccess, notifyError } from "../../utils/toast";
import ProductServices from "../../services/ProductServices";
import CategoryServices from "../../services/CategoryServices";
import { SidebarContext } from "../../context/SidebarContext";
import { useGetDomain } from "../../hooks/useGetDomain";
const ShowHideButton = ({ id, status }) => {
  const domain = useGetDomain();
  const location = useLocation();
  const { setIsUpdate } = useContext(SidebarContext);

  const handleChangeStatus = (id) => {
    let newStatus;
    if (status === true) {
      newStatus = false;
    } else {
      newStatus = true;
    }

    if (
      location.pathname === "/category" ||
      location.pathname.startsWith("/category")
    ) {
      CategoryServices.togglePublish(id, domain)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(`Category publish is ${res.data.is_published} `);
        })
        .catch((err) => notifyError(err.msg));
    }

    if (
      location.pathname === "/products" ||
      location.pathname.startsWith("/products")
    ) {
      ProductServices.updateStatus(id, domain)
        .then((res) => {
          // alert(res.msg);
          setIsUpdate(true);
          notifySuccess(res.msg);
        })
        .catch((err) => notifyError(err.message));
    }
  };

  return (
    <span
      className="cursor-pointer text-xl flex justify-center text-center"
      onClick={() => handleChangeStatus(id)}
    >
      {status === true ? (
        <BsToggleOn className="text-green-500" />
      ) : (
        <BsToggleOff className="text-orange-500" />
      )}
    </span>
  );
};

export default ShowHideButton;
