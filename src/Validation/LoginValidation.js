import * as yup from "yup";
export const LoginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("email is required"),
  password: yup.string().min(8).max(15).required("Please enter your password"),
});
