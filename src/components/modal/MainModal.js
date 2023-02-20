import React, { useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Modal, ModalBody, ModalFooter, Button } from "@windmill/react-ui";
import { FiTrash2 } from "react-icons/fi";

import UserServices from "../../services/UserServices";
import AdminServices from "../../services/AdminServices";
import CouponServices from "../../services/CouponServices";
import VariantsServices from "../../services/VariantsServices";
import AddonsServices from "../../services/AddonsServices";
import ProductServices from "../../services/ProductServices";
import CategoryServices from "../../services/CategoryServices";
import { SidebarContext } from "../../context/SidebarContext";
import { notifySuccess, notifyError } from "../../utils/toast";
import useToggleDrawer from "../../hooks/useToggleDrawer";
import BranchLocation from "../../services/BranchLocationService";
import { useGetDomain } from "../../hooks/useGetDomain";
const MainModal = ({ id, title }) => {
  const { isModalOpen, closeModal, setIsUpdate } = useContext(SidebarContext);
  const { setServiceId } = useToggleDrawer();
  const location = useLocation();
  const domain = useGetDomain();
  const history = useHistory();
  const handleDelete = () => {
    console.log("Deleting  " + id + " and title is " + title);
    if (location.pathname === "/products") {
      ProductServices.deleteProduct(id)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeModal();
      setServiceId();
    }
    if (location.pathname.startsWith("/category/subCategory/")) {
      CategoryServices.deleteCategory(id)
        .then((res) => {
          // setIsUpdate(true);
          notifySuccess(res.message);
          history.replace("/category");
          console.log(res.msg);
        })
        .catch((err) => notifyError(err.message));
      closeModal();
      setServiceId();
    }
    if (location.pathname === "/category") {
      CategoryServices.deleteCategory(id)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeModal();
      setServiceId();
    }
    if (location.pathname === "/customers") {
      UserServices.deleteUser(id)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeModal();
      setServiceId();
    }
    if (
      location.pathname === "/variants" ||
      location.pathname.startsWith("/varinats/")
    ) {
      VariantsServices.deleteVariant(id)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeModal();
      setServiceId();
    }
    if (
      location.pathname === "/addons" ||
      location.pathname.startsWith("/addons/")
    ) {
      AddonsServices.deleteAddon(id)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeModal();
      setServiceId();
    }
    if (location.pathname === "/coupons") {
      CouponServices.deleteCoupon(id)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeModal();
      setServiceId();
    }
    if (location.pathname === "/our-staff") {
      AdminServices.deleteStaff(id)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeModal();
      setServiceId();
    }
    // FIXED:delete location by id doesn't work as intended
    if (location.pathname === "/locations") {
      BranchLocation.deleteBranchLocation({ id, domain })
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeModal();
      setServiceId();
    }
  };
  return (
    <>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalBody className="text-center custom-modal px-8 pt-6 pb-4">
          <span className="flex justify-center text-3xl mb-6 text-red-500">
            <FiTrash2 />
          </span>
          <h2 className="text-xl font-medium mb-1">
            Are You Sure! Want to Delete{" "}
            <span className="text-red-500">{title}</span> Record?
          </h2>
          <p>
            Do you really want to delete these records? You can't view this in
            your list anymore if you delete!
          </p>
        </ModalBody>
        <ModalFooter className="justify-center">
          <Button
            className="w-full sm:w-auto hover:bg-white hover:border-gray-50"
            layout="outline"
            onClick={closeModal}
          >
            No, Keep It
          </Button>
          <Button onClick={handleDelete} className="w-full sm:w-auto">
            Yes, Delete It
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default React.memo(MainModal);
