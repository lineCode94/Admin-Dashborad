import React, { useContext } from "react";
import { TableBody, TableRow, TableCell, Avatar } from "@windmill/react-ui";
import MainModal from "../modal/MainModal";
import ShowHideButton from "../table/ShowHideButton";
import useToggleDrawer from "../../hooks/useToggleDrawer";
import EditDeleteButton from "../table/EditDeleteButton";
import { useHistory } from "react-router-dom";
import { AdminContext } from "../../context/AdminContext";
// import Accordion from "react-bootstrap/Accordion";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
// import "bootstrap/dist/css/bootstrap.min.css";

const VariantTable = ({ vari }) => {
  const { title, serviceId, handleModalOpen, setServiceId } = useToggleDrawer();
  const { state } = useContext(AdminContext);
  const domain = state?.adminInfo?.data?.domain;

  const history = useHistory();
  const handleOnClick = (id) => {
    history.push(`/variants/${id}`);
  };

  return (
    <>
      <MainModal id={serviceId} title={title} />
      <Accordion style={{ borderRadiusTop: "20px" }} allowZeroExpanded={true}>
        {vari?.map((variant) => (
          <AccordionItem key={variant.id}>
            <AccordionItemHeading>
              <AccordionItemButton style={{ borderRadiusTop: "20px" }}>
                <span className="inline-block mt-2">{variant.title}</span>
                <EditDeleteButton
                  id={variant.id}
                  title={variant.title}
                  handleUpdate={(id) => {
                    history.push(`/variants/edit/${id}`);
                  }}
                  handleModalOpen={handleModalOpen}
                />
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              {variant.values.map((val) => (
                <div
                  style={{ borderBottom: "1px solid #d5d6d7", padding: "10px" }}
                >
                  {val.title}{" "}
                </div>
              ))}
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

export default VariantTable;
