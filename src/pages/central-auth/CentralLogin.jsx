import { Button, HelperText, Input, Label } from "@windmill/react-ui";
// import { Button } from "bootstrap";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorSpan from "../../components/shared/ErrorSpan";
import { AdminContext, AdminActions } from "../../context/AdminContext";
import InputField from "../../components/shared/InputField";

import { LoginSchema } from "../../Validation/LoginValidation";
import AdminServices from "../../services/AdminServices";
import { notifyError, notifySuccess } from "../../utils/toast";
const CentralLogIn = () => {
  const registerRoute = "/Register";
  const storesRoute = "/stores";

  const { dispatch } = useContext(AdminContext);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const history = useHistory();
  const submit = async (data) => {
    try {
      const res = await AdminServices.getSubDomains(data);
      if (res.status) {
        dispatch({
          type: AdminActions.central,
          payload: res.data,
        });
        reset();
        history.push(storesRoute);
      } else {
        throw new Error(res.msg);
      }
    } catch (error) {
      notifyError(error.message);
    }
  };

  return (
    <>
      <form
        style={{
          minHeight: "100vh",
          minWidth: "100vw",
        }}
        onSubmit={handleSubmit(submit)}
        className="flex flex-col space-y-8 justify-center items-center bg-gray-50 dark:bg-gray-800"
      >
        <div className="text-center flex flex-col space-y-2">
          <h1 className="text-3xl "> Login to your account</h1>
          <Link
            to={registerRoute}
            className="hover:text-black text-base mt-3 text-yellow-300 "
          >
            {" "}
            Or create a new account !
          </Link>
        </div>
        <div className="max-w-xs  mx-4 sm:max-w-sm  w-full shadow-md border-2 border-gray-100 rounded-md p-6">
          {/* <Label>
            <span className="text-gray-800">Email address</span>
            <Input
              {...register("email", {
                required: true,
              })}
              className="mt-1 border-2 border-gray-200 h-10 shadow-sm  focus:border-yellow-400"
            />
            <ErrorSpan error={errors.email}/>
          </Label> */}
          <InputField
            label={"Email"}
            placeholder="Email address"
            register={register}
            registerName="email"
            error={errors.email}
          />
          <InputField
            label={"Password"}
            placeholder="*********"
            register={register}
            registerName="password"
            error={errors.password}
            type="password"
          />
          <Button type="submit" className="w-full mt-10">
            Login
          </Button>
        </div>
      </form>
    </>
  );
};

export default CentralLogIn;
