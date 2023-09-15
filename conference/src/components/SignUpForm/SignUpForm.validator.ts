import * as yup from "yup";

export const digitRegex = /\d+/;
export const lowerCaseRegex = /[a-z]+/;
export const upperCaseRegex = /[A-Z]+/;
export const nonAlphaCharRegex = /\W+/;
export const requiredPasswordLength = 8;

export const validationSchema = yup.object({
  email: yup.string().trim().email("Enter a valid email").required("Email is required"),
  firstName: yup.string().trim().required("First name is required"),
  lastName: yup.string().trim().required("Last name is required"),
  country: yup.string().trim().required("Country is required"),
  affiliation: yup.string().trim().required("Affiliation is required"),
  webpage: yup.string().trim().url("Must be a valid URL"),
  password: yup
    .string()
    .trim()
    .min(requiredPasswordLength, "Password must be of minimum 8 characters length")
    .matches(digitRegex, "Password must have at least one digit")
    .matches(lowerCaseRegex, "Password must have at least one lower-case letter (a-z)")
    .matches(upperCaseRegex, "Password must have at least one upper-case letter (A-Z)")
    .matches(nonAlphaCharRegex, "Password must have at least one non-alphabetical character (!, @, #, etc.)")
    .required("Password is required"),
  passwordRepeat: yup
    .string()
    .trim()
    .oneOf([yup.ref("password")], "Passwords must match")
});