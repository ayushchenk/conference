import * as yup from "yup";

export const validationSchema = yup.object({
  email: yup.string().trim().email("Enter a valid email").required("Email is required"),
  firstName: yup.string().trim().required("First name is required"),
  lastName: yup.string().trim().required("Last name is required"),
  country: yup.string().trim().required("Country is required"),
  affiliation: yup.string().trim().required("Affiliation is required"),
  webpage: yup.string().trim().url("Should be a valid URL"),
  password: yup
    .string()
    .trim()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  passwordRepeat: yup
    .string()
    .trim()
    .oneOf([yup.ref("password")], "Passwords must match")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});
