import { useHistory, useParams } from "react-router-dom";
import CategoryServices from "../../services/CategoryServices";
import useAsync from "../../hooks/useAsync";
import { Badge, Card, CardBody, Button } from "@windmill/react-ui";
import Loading from "../../components/preloader/Loading";
import NotFound from "../../components/table/NotFound";
import { FiTrash2 } from "react-icons/fi";
import Tooltip from "../../components/tooltip/Tooltip";
import { notifySuccess } from "../../utils/toast";
import { useGetDomain } from "../../hooks/useGetDomain";
import useToggleDrawer from "../../hooks/useToggleDrawer";
import MainModal from "../../components/modal/MainModal";
import { getImage } from "../../utils/getImage";
const SubCategoryPage = () => {
  const { id } = useParams();
  const history = useHistory();
  const domain = useGetDomain();
  const { handleModalOpen } = useToggleDrawer();

  const {
    data: { data: myData },
    loading,
  } = useAsync(() =>
    CategoryServices.getCategoryById(id, `${domain}&sub_category=1`)
  );

  if (loading) return <Loading loading={loading} />;
  if (myData === undefined) {
    return <NotFound title={"Sub-Category"} />;
  }
  return (
    <>
      <MainModal id={id} title={myData?.title} />
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
              onClick={() => handleModalOpen(id, myData?.title)}
              className="p-2 cursor-pointer text-gray-400 hover:text-red-600"
            >
              <Tooltip
                id="delete"
                Icon={FiTrash2}
                title="Delete sub-category"
                bgColor="#EF4444"
              />
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
              edit sub-Category
            </Button>
            <Button className="mr-4">Add translation</Button>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default SubCategoryPage;
