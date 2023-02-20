import React, { useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import CategoryServices from "../../services/CategoryServices";
import useAsync from "../../hooks/useAsync";
import {
  Badge,
  Card,
  CardBody,
  TableCell,
  TableHeader,
  TableContainer,
  Table,
  Button,
} from "@windmill/react-ui";
import Loading from "../../components/preloader/Loading";
import CategoryTable from "../../components/category/CategoryTable";
import NotFound from "../../components/table/NotFound";
import { AdminContext } from "../../context/AdminContext";
import { IoAdd } from "react-icons/io5";
import { FiTrash2 } from "react-icons/fi";
import Tooltip from "../../components/tooltip/Tooltip";
import { notifySuccess } from "../../utils/toast";
import Category from "./Category";
import { useGetDomain } from "../../hooks/useGetDomain";
import { getImage } from "../../utils/getImage";
const SingleCategoryPage = () => {
  const { id } = useParams();
  const history = useHistory();
  const { state } = useContext(AdminContext);
  const domain = useGetDomain();
  const {
    data: { data: myData },
    loading,
  } = useAsync(() =>
    CategoryServices.getCategoryById(id, `${domain}&sub_category=1`)
  );
  // const { handleModalOpen, setServiceId } = useToggleDrawer();
  // useEffect(() => {
  //   if (!loading) setServiceId(myData.id);
  // }, [loading]);

  if (loading) return <Loading loading={loading} />;
  if (myData === undefined) {
    return <NotFound title={"Category"} />;
  }
  return (
    <>
      <Card className="flex mt-8 p-2 flex-col md:flex-row bg-white">
        <div className="border-0 border-b-2 md:border-r-2 w-full md:w-1/2 border-opacity-50 border-gray-200 p-2">
          <img
            className="object-cover w-full h-64"
            alt={myData.title}
            src={getImage(myData.image.image_url)}
          />
        </div>
        <CardBody className="ml-2 flex flex-col w-full">
          <div className="w-full flex flex-row-reverse p-2 ">
            <div
              onClick={() => {
                CategoryServices.deleteCategory(id).then((res) => {
                  if (res.status) {
                    notifySuccess(`Category ${myData.title} deleted`);
                    history.push("/category");
                  }
                });
              }}
              className="p-2 cursor-pointer text-gray-400 hover:text-red-600"
            >
              <Tooltip id="delete" Icon={FiTrash2} bgColor="#EF4444" />
            </div>
          </div>
          <p className="mb-4 font-bold text-gray-800 dark:text-gray-300 text-2xl">
            {myData.title}
          </p>
          <div className="pb-2 flex space-x-4 items-center">
            <Badge type="warning">
              <span className="p-1">
                {myData.is_published ? "Published" : "Not Published"}
              </span>
            </Badge>
            <p className="text-black dark:text-white">
              children: {myData?.sub_categories?.length}
            </p>
            <p className="text-black dark:text-white">
              Products: {myData?.products_count}
            </p>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            {myData.description}
          </p>
          <div className="flex mt-auto items-center justify-start   w-full  flex-row-reverse">
            <Button onClick={() => history.push(`/category/edit/${id}`)}>
              edit Category
            </Button>
            <Button className="mr-4">Add translation</Button>
          </div>
        </CardBody>
      </Card>
      <Card
        className={`${
          myData?.sub_categories?.length !== 0 ? "bg-white" : "bg-gray-200"
        } mt-10`}
      >
        {loading ? (
          <Loading loading={loading} />
        ) : myData.sub_categories.length !== 0 ? (
          <Card className="bg-white p-2 flex flex-col">
            <div className="w-full mb-2 flex flex-row  items-center justify-between">
              <div className="p-3">
                <div className="font-semibold text-lg">Subcategories</div>
                <div className="text-sm">
                  Products:{" "}
                  {Category?.sub_categories?.reduce(
                    (accumulator, currentValue) =>
                      accumulator + currentValue.products_count,
                    0
                  )}
                </div>
              </div>
              <Button
                onClick={() => history.push(`/category/${id}/add-sub-category`)}
                className=" space-x-2"
              >
                <IoAdd />
                Add Subcategory
              </Button>
            </div>
            <TableContainer className="mb-8">
              <Table>
                <TableHeader>
                  <tr>
                    <TableCell>ID</TableCell>
                    <TableCell>Image</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>PRODUCTS</TableCell>
                    <TableCell className="text-center">Published</TableCell>
                    <TableCell className="text-right">Actions</TableCell>
                  </tr>
                </TableHeader>
                <CategoryTable
                  categories={myData.sub_categories}
                  isSub={true}
                />
              </Table>
            </TableContainer>
          </Card>
        ) : (
          <div className="w-full h-40 flex flex-col justify-center items-center ">
            <div className="mb-2 text- text-gray-600 dark:text-gray-200">
              this Category has No Sub-catagories yet
            </div>
            <Button
              className="p-1"
              onClick={() => {
                history.push(`/category/${id}/add-sub-category`);
              }}
            >
              <IoAdd className="mr-2" />
              Add Sub-Category !
            </Button>
          </div>
        )}
      </Card>
    </>
  );
};

export default SingleCategoryPage;
