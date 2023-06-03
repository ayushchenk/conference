import * as yup from "yup";

export const validationSchema = yup.object({
    email: yup
        .string()
        .email("Enter a valid email")
        .required("Email is required"),
    firstName: yup
        .string()
        .required("First name is required"),
    lastName: yup
        .string()
        .required("Last name is required"),
    country: yup
        .string()
        .required("Country is required"),
    affiliation: yup
        .string()
        .required("Affiliation is required"),
        webpage: yup
        .string(),
    password: yup
        .string()
        .min(8, "Password should be of minimum 8 characters length")
        .required("Password is required"),
    passwordRepeat: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords must match")
        .min(8, "Password should be of minimum 8 characters length")
        .required("Password is required"),
});