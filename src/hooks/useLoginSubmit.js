import Cookies from "js-cookie";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";
import AdminServices from "../services/AdminServices";
import { notifyError, notifySuccess } from "../utils/toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { useGetDomain } from "./useGetDomain";

const useLoginSubmit = (Schema) => {
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext(AdminContext);
  const history = useHistory();
  const location = useLocation();
  const domain = useGetDomain(),
    tenant_id = useGetDomain();
  const {
    watch,
    trigger,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
  } = useForm({
    resolver: yupResolver(Schema),
    mode: "onChange",
    // defaultValues: {
    //   // default values for testing
    //   name: "name",
    //   email: "linecode@gmail.com",
    //   password: "12345678",
    //   domain: "domain",
    //   store_name: "sotername",
    //   phone: "011234567",
    //   branch_phone: "091725788",
    //   dine_in: 1,
    //   pickable: 0,
    //   shipping: 0,
    //   country_id: 1,
    //   city_id: 0,
    //   gov_id: 0,
    //   //
    // },
  });

  const onSubmit = (data) => {
    const {
      name,
      email,
      password,
      domain,
      store_name,
      phone,
      branch_phone,
      dine_in,
      pickable,
      shipping,
      country_id,
      city_id,
      address,
      title,
      verifyEmail,
    } = data;
    setLoading(true);
    //wnated

    const cookieTimeOut = 0.5;

    if (location.pathname === "/login") {
      AdminServices.loginAdmin({ email, password, tenant_id })
        .then((res) => {
          console.log(res);
          if (res.status) {
            setLoading(false);
            notifySuccess("Login Success!");
            dispatch({ type: "USER_LOGIN", payload: res });
            Cookies.set("adminInfo", JSON.stringify(res), {
              expires: cookieTimeOut,
            });
            history.replace("/");
          } else {
            notifyError(res.msg);
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log("err", err);

          notifyError(err ? err.response.data.message : err.message);
          setLoading(false);
        });
    }
    if (location.pathname === "/Register") {
      if (!shipping && !pickable && !dine_in) {
        setError("bussiness", {
          type: "required",
          message: "please select one of the above..",
        });
        return;
      }
      AdminServices.registerAdmin({
        name,
        email,
        password,
        domain,
        store_name,
        phone,
        branch_phone,
        dine_in,
        pickable,
        shipping,
        country_id,
        city_id,
        address,
        title,
      })
        .then((res) => {
          try {
            if (res) {
              setLoading(false);
              notifySuccess("Register Success!");
              dispatch({ type: "USER_LOGIN", payload: res });
              Cookies.set("adminInfo", JSON.stringify(res), {
                expires: cookieTimeOut,
              });
              history.replace("/");
              //  window.location.href =`${window.location.protocol}//${domain}.${window.location.host}/`
            }
          } catch (error) {
            console.log("try catch", error.message);
          }
        })
        .catch((err) => {
          // console.log("error res", err);
          notifyError("err ? err?.response?.info?.data?.message : err.message");
          setLoading(false);
        });
    }

    if (location.pathname === "/forgot-password") {
      AdminServices.forgetPassword({ verifyEmail })
        .then((res) => {
          console.log(res);
          setLoading(false);
          notifySuccess(res.message);
        })
        .catch((err) => {
          setLoading(false);
          notifyError(err ? err.response.data.message : err.message);
        });
    }
  };
  return {
    onSubmit,
    register,
    handleSubmit,
    errors,
    loading,
    trigger,
    watch,
    setValue,
  };
};

export default useLoginSubmit;
