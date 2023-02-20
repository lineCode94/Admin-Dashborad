import { Alert, Button, Card, CardBody, Input } from "@windmill/react-ui";
import React, { useContext, useEffect, useRef, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import StoresTable from "../../components/Stores/StoreTable";
import PageTitle from "../../components/Typography/PageTitle";
import { AdminContext } from "../../context/AdminContext";

const Stores = () => {
  const goHome = () => history.replace("/");
  const registerRoute = "/Register";
  const {
    state: { central },
  } = useContext(AdminContext);
  // const email = "Email@2";
  const history = useHistory();
  const [domains, setDomains] = useState(null);
  const [previewStores, setPreviewStores] = useState(domains);
  useEffect(() => {
    if (!central.user_domains.length) goHome();
    if (central.user_domains.length) {
      setDomains(() => central.user_domains);
      setPreviewStores(central.user_domains);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const searchRef = useRef("");

  return (
    <>
      <main
        style={{ width: "100vw", height: "100vh", backgroundColor: "#E5E7EB" }}
        className="flex flex-col justify-start items-center  "
      >
        <div className="w-full mt-20 max-w-xs p-4 sm:max-w-sm md:max-w-lg lg:max-w-4xl">
          <PageTitle className="w-full text-left">Access your stores</PageTitle>
          <Card className="min-w-0 w-full flex shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5 justify-center">
            <CardBody className="w-full">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const searchQuery = searchRef.current.value.toLowerCase();
                  const newDomain = domains?.filter((d) =>
                    d.store_name.toLowerCase().includes(searchQuery)
                  );
                  setPreviewStores(newDomain);
                  if (!searchQuery) setPreviewStores(domains);
                }}
                className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex"
              >
                <div className="flex-grow-1 md:flex-grow lg:flex-grow xl:flex-grow">
                  <Input
                    ref={searchRef}
                    className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                    type="search"
                    name="search"
                    onChange={(e) => {
                      const searchQuery = searchRef.current.value.toLowerCase();
                      const newDomain = domains?.filter((d) =>
                        d.store_name.toLowerCase().includes(searchQuery)
                      );
                      setPreviewStores(newDomain);
                      if (!searchQuery) setPreviewStores(domains);
                    }}
                    placeholder="Search Store"
                  />
                  <button
                    type="submit"
                    className="absolute right-0 top-0 mt-5 mr-1"
                  ></button>
                </div>
                <div className="w-full md:w-56 lg:w-56 xl:w-56">
                  <Button
                    type="button"
                    onClick={() => history.push(registerRoute)}
                    className="w-full rounded-md h-12"
                  >
                    <span className="mr-3">
                      <FiPlus />
                    </span>
                    Add Store
                  </Button>
                </div>
              </form>
            </CardBody>
          </Card>
          {previewStores?.length < 1 ? (
            <Alert type="warning">No stores match the search </Alert>
          ) : (
            <StoresTable stores={previewStores} />
          )}
        </div>
      </main>
    </>
  );
};

export default Stores;
