import React from "react";
// import { Label, Input } from "@windmill/react-ui";
import Error from "../components/form/Error";
import InputArea from "../components/form/InputArea";
import useLoginSubmit from "../hooks/useLoginSubmit";
import BrandDark from "../assets/img/logo/logo-dark.png";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/custom.css";
import { Button } from "react-bootstrap";
import SelectLocation from "../components/form/SelectLocation";

const RegisterStep2 = () => {
  const { onSubmit, register, handleSubmit, errors, loading } =
    useLoginSubmit();
  return (
    <div className=" min-h-screen  p-6 bg-gray-50 dark:bg-gray-900">
      <h1 className="brand">
        <img src={BrandDark} alt="brand Icon" />{" "}
      </h1>
      <h1 className="mb-2 text-2xl text-center font-semibold text-gray-700 dark:text-gray-200">
        Create a new account
      </h1>
      <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
        <div className="flex-1 h-full max-w-2xl mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
          <div className="flex flex-col overflow-y-auto md:flex-row">
            <main className="flex items-center justify-center p-6 sm:p-12 md:w-full">
              <div className="w-full">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="py-1">
                    <h3 className="">Locations</h3>
                    <p>
                      You have to create at least one location to get started.
                    </p>
                  </div>

                  <div className="row   py-2">
                    <SelectLocation />
                  </div>

                  <div className="row">
                    <div className="col-6 mt-4">
                      <label className="mb-2">Location Name</label>
                      <InputArea
                        register={register}
                        label="Location Name"
                        name="branch_name"
                        type="text"
                        placeholder="Location Name"
                      />
                      <Error errorName={errors.branch_name} />
                    </div>
                    <div className="col-6 col-6 mt-4 ">
                      <label className="mb-2">Location Number </label>

                      <InputArea
                        register={register}
                        label="Phone"
                        name="Phone"
                        type="text"
                        placeholder="Location Number"
                      />
                      <Error errorName={errors.Phone} />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 mt-4">
                      <label className="mb-2">Address</label>
                      <InputArea
                        register={register}
                        label="Address"
                        name="Address"
                        type="text"
                        placeholder="Address"
                      />
                      <Error errorName={errors.Address} />
                    </div>
                  </div>

                  <h5 className="mt-4">Type of busisness</h5>
                  <div className="mb-2 py-2">
                    <Form.Check
                      inline
                      type="checkbox"
                      id="regiseter3"
                      label="Shipping"
                    />
                    <Form.Check
                      inline
                      type="checkbox"
                      id="regiseter1"
                      label="Pick up"
                    />
                    <Form.Check
                      inline
                      type="checkbox"
                      id="regiseter2"
                      label="Dine in"
                    />
                  </div>

                  <Button
                    disabled={loading}
                    type="submit"
                    className="border-0 text-dark mt-4 h-12 w-full text-xl 	  font-large bg-green-500 "
                    to="/dashboard"
                    block
                    style={{
                      fontSize: "1.125rem",
                      lineHeight: "1.75rem",
                      fontWeight: "500",
                    }}
                  >
                    Create your store
                  </Button>
                </form>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterStep2;
