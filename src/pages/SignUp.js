import React from "react";
import { Link } from "react-router-dom";
import { Input, Label } from "@windmill/react-ui";
// import { ImFacebook, ImGoogle } from 'react-icons/im';
import { useState } from "react";

import Error from "../components/form/Error";
import InputArea from "../components/form/InputArea";
import LabelArea from "../components/form/LabelArea";
// import SelectRole from '../components/form/SelectRole';
import useLoginSubmit from "../hooks/useLoginSubmit";
import ImageLight from "../assets/img/create-account-office.jpeg";
import ImageDark from "../assets/img/create-account-office-dark.jpeg";
import "bootstrap/dist/css/bootstrap.min.css";

const SignUp = () => {
  const { onSubmit, register, handleSubmit, errors } = useLoginSubmit();
  const [domain, setDomain] = useState(null);
  window.localStorage.setItem("subDomain", domain);

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
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                Create account
              </h1>
              {/* onSubmit={handleSubmit(onSubmit)} */}
              <form onSubmit={handleSubmit(onSubmit)}>
                <LabelArea label="Store Name" />
                <InputArea
                  register={register}
                  label="Store Name"
                  name="store_name"
                  type="text"
                  placeholder="Store Name"
                />
                <Error errorName={errors.StoreName} />
                <LabelArea label="Full Name" />
                <InputArea
                  register={register}
                  label="Full Name"
                  name="name"
                  type="text"
                  placeholder="Admin"
                />
                <Error errorName={errors.name} />
                {/* <LabelArea label="Domain Name" />
                <InputArea
                  register={register}
                  label="Domain Name"
                  name="domain"
                  type="text"
                  placeholder="Domain Name"
                  onChange={e => setDomain(e.target.value)}
                />
                <Error errorName={errors.domain} /> */}

                <LabelArea label="Domain Name" />
                <div className="input-group  ">
                  <input
                    style={{ background: "#F4F5F7" }}
                    register={register}
                    label="Domain Name"
                    name="domain"
                    type="text"
                    placeholder="Domain Name"
                    onChange={(e) => setDomain(e.target.value)}
                    className="form-control border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                  />
                  <span className="input-group-text" id="basic-addon2">
                    .myiksib.com
                  </span>
                </div>
                <Error errorName={errors.domain} />

                <LabelArea label="Email" />
                <InputArea
                  register={register}
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="john@doe.com"
                />
                <Error errorName={errors.email} />

                <LabelArea label="Password" />
                <InputArea
                  register={register}
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="***************"
                />
                <Error errorName={errors.password} />

                <LabelArea label="Phone" />
                <InputArea
                  register={register}
                  label="Phone"
                  name="phone"
                  type="text"
                  placeholder="Phone "
                />
                <Error errorName={errors.Phone} />

                {/* <LabelArea label="Staff Role" />
                <div className="col-span-8 sm:col-span-4">
                  <SelectRole register={register} label="Role" name="role" />
                  <Error errorName={errors.role} />
                </div> */}

                <Label className="mt-6" check>
                  <Input type="checkbox" />
                  <span className="ml-2">
                    I agree to the{" "}
                    <span className="underline">privacy policy</span>
                  </span>
                </Label>
                <Link
                  style={{ lineHeight: 1.9 }}
                  className="mt-4 h-10 w-full text-xl 	text-decoration-none font-medium text-green-500 dark:text-green-400 block  bg-green-500 text-center rounded-lg  "
                  to="/RegisterStep2"
                >
                  Next
                </Link>
                {/* <Button
                  disabled={loading}
                   type="submit"
                 
                  className="mt-4 h-12 w-full text-sm font-medium text-green-500 dark:text-green-400"
                  to= "/RegisterStep2" 
                  // href={`${window.location.protocol}//zeko.${window.location.host}/dashboard`}
                   
                
                >
                 Next
                </Button> */}
              </form>

              {/* <hr className="my-10" /> */}

              {/* <button
                disabled
                className="text-sm inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-serif text-center justify-center rounded-md focus:outline-none text-gray-700 bg-gray-100 shadow-sm my-2 md:px-2 lg:px-3 py-4 md:py-3.5 lg:py-4 hover:text-white hover:bg-blue-600 h-11 md:h-12 w-full mr-2"
              > */}
              {/* <ImFacebook className="w-4 h-4 mr-2" />{' '} */}
              {/* <span className="ml-2">Login With Facebook</span>
              </button>
              <button
                disabled
                className="text-sm inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-serif text-center justify-center rounded-md focus:outline-none text-gray-700 bg-gray-100 shadow-sm my-2  md:px-2 lg:px-3 py-4 md:py-3.5 lg:py-4 hover:text-white hover:bg-red-500 h-11 md:h-12 w-full"
              >
                <ImGoogle className="w-4 h-4 mr-2" />{' '}
                <span className="ml-2">Login With Google</span>
              </button> */}

              <p className="mt-4">
                <Link
                  className="text-sm font-medium text-green-500 dark:text-green-400 hover:underline"
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

export default SignUp;
