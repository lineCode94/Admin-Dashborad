import React from "react";
// import { Link } from 'react-router-dom';
// import { Input, Label } from "@windmill/react-ui";
import { useState } from "react";
import Error from "../components/form/Error";
import InputArea from "../components/form/InputArea";
import LabelArea from "../components/form/LabelArea";
import "bootstrap/dist/css/bootstrap.min.css";
const StepOne = ({ register, errors, watch }) => {
  // const { onSubmit, register, handleSubmit, errors, loading } = useLoginSubmit();
  const [domain, setDomain] = useState(null);
  window.localStorage.setItem("subDomain", domain);

  return (
    <>
      <LabelArea label="Store Name" />
      <InputArea
        register={register}
        label="Store Name"
        name="store_name"
        type="text"
        placeholder="Store Name"
      />
      {<Error errorName={errors.store_name} /> && (
        <Error errorName={errors.store_name} />
      )}
      <LabelArea label="Full Name" />
      <InputArea
        register={register}
        label="Full Name"
        name="name"
        type="text"
        placeholder="Admin"
      />
      <Error errorName={errors.name} />

      <LabelArea label="Domain Name" />
      <div className="input-group  ">
        <InputArea
          style={{ background: "#F4F5F7", width: "67%" }}
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
      <Error errorName={errors.phone} />

      {/* <LabelArea label="Staff Role" />
                <div className="col-span-8 sm:col-span-4">
                  <SelectRole register={register} label="Role" name="role" />
                  <Error errorName={errors.role} />
                </div> */}

      {/* <Label className="mt-6" check>
        <Input type="checkbox" />
        <span className="ml-2">
          I agree to the <span className="underline">privacy policy</span>
        </span>
      </Label> */}
    </>
  );
};

export default StepOne;
