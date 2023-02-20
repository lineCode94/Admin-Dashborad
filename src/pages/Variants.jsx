import React, { useContext } from "react";
import {
  Table,
  TableHeader,
  TableCell,
  TableFooter,
  TableContainer,
  Input,
  Card,
  CardBody,
  Pagination,
  Button,
} from "@windmill/react-ui";
// import CategoryServices from "../services/CategoryServices";
import VariantTable from "../components/variants/VariantTable";
import useAsync from "../hooks/useAsync";
import useFilter from "../hooks/useFilter";
import NotFound from "../components/table/NotFound";
import VariantsServices from "../services/VariantsServices";
import Loading from "../components/preloader/Loading";
import PageTitle from "../components/Typography/PageTitle";
// import CustomerTable from "../components/customer/CustomerTable";
import { AdminContext } from "../context/AdminContext";
import { FiPlus } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import "../assets/css/custom.css";
const Variants = () => {
  const history = useHistory();
  const { state } = useContext(AdminContext);
  const domain = state?.adminInfo?.data?.domain;
  console.log("domain", domain);
  const {
    data: { data: variants },
    loading,
  } = useAsync(() => VariantsServices.getAllVariants(domain));

  const {
    VariantRef,
    // handleChangePage,
    // totalResults,
    // resultsPerPage,
    dataTable,
    serviceData,
    handleSubmitVariant,
  } = useFilter(variants);
  // console.log(dataTable);
  return (
    <>
      <PageTitle>Variants</PageTitle>
      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody>
          <form
            onSubmit={handleSubmitVariant}
            className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex"
          >
            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <Input
                ref={VariantRef}
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                type="search"
                name="search"
                placeholder="Search variants"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 mt-5 mr-1"
              ></button>
            </div>
            <div className="w-full md:w-56 lg:w-56 xl:w-56">
              <Button
                type="button"
                onClick={() => history.push("/variants/add-new-variant")}
                className="w-full rounded-md h-12"
              >
                <span className="mr-3">
                  <FiPlus />
                </span>
                Add Variants
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>

      {loading ? (
        <Loading loading={loading} />
      ) : serviceData?.length !== 0 ? (
        <div>
          <VariantTable vari={dataTable} />
        </div>
      ) : (
        <NotFound title="variants" />
      )}
    </>
  );
};

export default Variants;
