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
import AddonTable from "../components/addons/AddonTable";
import useAsync from "../hooks/useAsync";
import useFilter from "../hooks/useFilter";
import NotFound from "../components/table/NotFound";
import AddonsServices from "../services/AddonsServices";
import Loading from "../components/preloader/Loading";
import PageTitle from "../components/Typography/PageTitle";
// import CustomerTable from "../components/customer/CustomerTable";
import { AdminContext } from "../context/AdminContext";
import { FiPlus } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import { useGetDomain } from "../hooks/useGetDomain";
// import Addons from "./Addons";

const Addons = () => {
  const history = useHistory();
  const { state } = useContext(AdminContext);
  const domain = useGetDomain();
  const {
    data: { data: addons },
    loading,
  } = useAsync(() => AddonsServices.getAllAddons(domain));
  // console.log(addons);
  // console.log(domain);
  // const {
  //   data: { data: categories },
  //   loading,
  // } = useAsync(() => CategoryServices.getAllCategory(domain));
  const {
    AddonRef,
    handleChangePage,
    totalResults,
    resultsPerPage,
    dataTable,
    serviceData,
    handleSubmitAddon,
  } = useFilter(addons);
  console.log(dataTable);
  return (
    <>
      <PageTitle>Addons</PageTitle>
      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody>
          <form
            onSubmit={handleSubmitAddon}
            className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex"
          >
            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <Input
                ref={AddonRef}
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                type="search"
                name="search"
                placeholder="Search Addons"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 mt-5 mr-1"
              ></button>
            </div>
            <div className="w-full md:w-56 lg:w-56 xl:w-56">
              <Button
                type="button"
                onClick={() => history.push("/addons/add-new-addon")}
                className="w-full rounded-md h-12"
              >
                <span className="mr-3">
                  <FiPlus />
                </span>
                Add Addon
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>

      {loading ? (
        <Loading loading={loading} />
      ) : serviceData?.length !== 0 ? (
        <TableContainer className="mb-8">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Trnaslations</TableCell>
                <TableCell className="text-right">Actions</TableCell>
              </tr>
            </TableHeader>
            <AddonTable addonss={dataTable} />
          </Table>
          <TableFooter>
            <Pagination
              totalResults={totalResults}
              resultsPerPage={resultsPerPage}
              onChange={handleChangePage}
              label="Table navigation"
            />
          </TableFooter>
        </TableContainer>
      ) : (
        <NotFound title="Addons" />
      )}
    </>
  );
};

export default Addons;
