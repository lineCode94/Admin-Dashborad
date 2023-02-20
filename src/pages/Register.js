import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@windmill/react-ui";

import { useState } from "react";

import useLoginSubmit from "../hooks/useLoginSubmit";
import ImageLight from "../assets/img/create-account-office.jpeg";
import ImageDark from "../assets/img/create-account-office-dark.jpeg";
import "bootstrap/dist/css/bootstrap.min.css";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import { RegisterSchema } from "../Validation/RegisterValidation";
const Register = () => {
  // const { onSubmit, register, handleSubmit, errors,trigger, loading } =
  const { onSubmit, register, handleSubmit, trigger, loading, errors, watch } =
    useLoginSubmit(RegisterSchema);
  // const onSubmit = (data) => {
  // };
  const [Page, setPage] = useState(0);
  const displayPage = () => {
    if (Page === 0) {
      return <StepOne register={register} errors={errors} watch={watch} />;
    } else {
      return <StepTwo register={register} loading={loading} errors={errors} />;
    }
  };
  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src={ImageLight}
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src={ImageDark}
              alt="Office"
            />
          </div>
          <main className="flex items-center justify-center p-3 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                Create account
              </h1>

              <form onSubmit={handleSubmit(onSubmit)}>
                {displayPage()}

                {Page > 0 ? (
                  ""
                ) : (
                  <Button
                    // type="submit"
                    onClick={async () => {
                      const res = await trigger([
                        "name",
                        "email",
                        "password",
                        "domain",
                        "store_name",
                        "phone",
                      ]);
                      if (res) {
                        setPage((page) => page + 1);
                      }
                    }}
                    style={{ lineHeight: 1.9, color: "#000" }}
                    className="mt-4 h-10 w-full text-xl text-black-50	text-decoration-none font-medium text-green-500 dark:text-green-400 block  bg-green-500 text-center rounded-lg  "
                  >
                    Next
                  </Button>
                )}
                {/* show form results  */}
                {/* <pre>{JSON.stringify(watch(), null, 2)}</pre> */}
              </form>

              <p className="mt-4">
                <Link
                  className="text-sm font-medium text-yellow-300 dark:text-green-400 hover:text-black"
                  to="/login"
                >
                  Already have an account? Login
                </Link>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Register;
