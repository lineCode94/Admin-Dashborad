import React, { useContext } from "react";
import {
  Table,
  TableHeader,
  TableCell,
  TableFooter,
  TableContainer,
  Button,
  Input,
  Card,
  CardBody,
  Pagination,
} from "@windmill/react-ui";
import { useHistory } from "react-router-dom";
import { FiPlus } from "react-icons/fi";

import useAsync from "../../hooks/useAsync";
import useFilter from "../../hooks/useFilter";
// import NotFound from "../../components/table/NotFound";
import Loading from "../../components/preloader/Loading";
import PageTitle from "../../components/Typography/PageTitle";
import CategoryServices from "../../services/CategoryServices";
import CategoryTable from "../../components/category/CategoryTable";
import { AdminContext } from "../../context/AdminContext";
import { useGetDomain } from "../../hooks/useGetDomain";

const Category = () => {
  const domain = useGetDomain();
  // renaming data.data to categories
  const {
    data: { data: categories },
    loading,
  } = useAsync(() => CategoryServices.getAllCategory(domain));

  const history = useHistory();
  const {
    categoryRef,
    handleChangePage,
    totalResults,
    resultsPerPage,
    dataTable,
    serviceData,
    handleSubmitCategory,
  } = useFilter(categories);

  return (
    <>
      <PageTitle>Category</PageTitle>

      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody>
          <form
            onSubmit={handleSubmitCategory}
            className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex"
          >
            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <Input
                ref={categoryRef}
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                type="search"
                name="search"
                placeholder="Search by category name"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 mt-5 mr-1"
              ></button>
            </div>
            <div className="w-full md:w-56 lg:w-56 xl:w-56">
              <Button
                type="button"
                onClick={() => history.push("/category/add-new-category")}
                className="w-full rounded-md h-12"
              >
                <span className="mr-3">
                  <FiPlus />
                </span>
                Add Category
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
                <TableCell className="hidden md:block">Image</TableCell>
                <TableCell>Category Name</TableCell>
                <TableCell>Sub Categories</TableCell>
                <TableCell>Sub-number</TableCell>
                <TableCell className="text-center">Published</TableCell>
                <TableCell className="text-right">Actions</TableCell>
              </tr>
            </TableHeader>
            <CategoryTable categories={dataTable} />
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
        <div className="w-full h-full text-xl text-center mt-10  text-gray-400 dark:text-gray-200">
          There's no categories yet
        </div>
      )}
    </>
  );
};

export default Category;
