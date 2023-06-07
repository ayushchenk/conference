import * as yup from "yup";

export const validationSchema = yup.object({
  email: yup.string().trim().email("Enter a valid email").required("Email is required"),
  password: yup.string().trim().required("Password is required"),
});
