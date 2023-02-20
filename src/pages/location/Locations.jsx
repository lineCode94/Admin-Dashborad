import {
  Button,
  Card,
  CardBody,
  Input,
  Table,
  TableCell,
  TableContainer,
  TableHeader,
} from "@windmill/react-ui";
import React, { createRef, useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import Loading from "../../components/preloader/Loading";
import PageTitle from "../../components/Typography/PageTitle";
import useAsync from "../../hooks/useAsync";
import BranchLocationService from "../../services/BranchLocationService";
// import { useGetDomain } from "../hooks/useGetDomain";
import LocationTable from "../../components/Branch/LocationTable";
const Locations = () => {
  const history = useHistory();

  const {
    loading,
    data: { data: locations },
  } = useAsync(() => BranchLocationService.getAllLocation());
  const [preViewLocations, setPreviewLocations] = useState(locations);
  const locationRef = createRef();
  // Search the locations array
  const handleSubmitLocation = (e) => {
    e.preventDefault();
    const query = locationRef.current.value.toLowerCase();
    if (query) {
      // setPreviewLocations(() =>
      const newArray = locations?.filter(
        (location) =>
          location.title.toLowerCase().includes(query) ||
          location.address.toLowerCase().includes(query) ||
          location.city.title.toLowerCase().includes(query)
      );
      setPreviewLocations(() => newArray);
      // );
    } else setPreviewLocations(locations);
  };
  useEffect(() => {
    setPreviewLocations(locations);
  }, [locations]);

  return (
    <>
      <PageTitle>Locations</PageTitle>

      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody>
          <form
            onSubmit={handleSubmitLocation}
            className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex"
          >
            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <Input
                ref={locationRef}
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                type="search"
                name="search"
                placeholder="Search Location"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 mt-5 mr-1"
              ></button>
            </div>
            <div className="w-full md:w-56 lg:w-56 xl:w-56">
              <Button
                type="button"
                onClick={() => history.push("/locations/new-location")}
                className="w-full rounded-md h-12"
              >
                <span className="mr-3">
                  <FiPlus />
                </span>
                Add Location
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>

      {loading ? (
        <Loading loading={loading} />
      ) : locations?.length !== 0 ? (
        <TableContainer className="mb-8">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell className="hidden md:block">Phone</TableCell>
                <TableCell>City</TableCell>
                <TableCell className="hidden md:block">Address</TableCell>
                <TableCell>Actions</TableCell>
              </tr>
            </TableHeader>
            <LocationTable locations={preViewLocations} />
          </Table>
        </TableContainer>
      ) : (
        <div className="w-full h-full text-xl text-center mt-10  text-gray-400 dark:text-gray-200">
          There's no Locations found!
        </div>
      )}
    </>
  );
};

export default Locations;
