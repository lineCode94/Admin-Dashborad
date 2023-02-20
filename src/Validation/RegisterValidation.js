// import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
const msg = "This field is required!";
export const RegisterSchema = yup.object().shape({
  name: yup.string().required(msg),
  email: yup.string().email().required(msg),
  password: yup.string().min(8).max(15).required(),
  domain: yup.string().required(msg),
  store_name: yup.string().required("Store Name is reqired"),
  phone: yup.number().typeError("Invalid Phone Number").required(),
  branch_phone: yup.number().typeError("Invalid branch  Number").required(msg),
  address: yup.string().required("Address is required!"),
  country_id: yup.string().required(msg),
  title: yup.string().required("Location Name is required!"),
  city_id: yup.string().required(msg),
  gov_id: yup.string().required(msg),
});
