import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import { usePostSignUpApi } from "./SignUpForm.hooks";

export const SignUpForm = () => {
  const { data, isError, isLoading, post } = usePostSignUpApi();

  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    password1: yup
      .string()
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
    password2: yup
      .string()
      .oneOf([yup.ref("password1")], "Passwords must match")
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password1: "",
      password2: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const formData = {
        email: values.email,
        password: values.password1,
      };
      post(formData)
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        fullWidth
        margin="normal"
        id="email"
        name="email"
        label="Email"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />
      <TextField
        fullWidth
        margin="normal"
        id="password1"
        name="password1"
        label="Password"
        type="password"
        value={formik.values.password1}
        onChange={formik.handleChange}
        error={formik.touched.password1 && Boolean(formik.errors.password1)}
        helperText={formik.touched.password1 && formik.errors.password1}
      />
      <TextField
        fullWidth
        margin="normal"
        id="password2"
        name="password2"
        label="Repeat password"
        type="password"
        value={formik.values.password2}
        onChange={formik.handleChange}
        error={formik.touched.password2 && Boolean(formik.errors.password2)}
        helperText={formik.touched.password2 && formik.errors.password2}
      />
        <Collapse in={isError} sx={{my: "10px"}}>
        <Alert severity="error">Something went wrong while creating your account.</Alert>
        </Collapse>
      <Button color="primary" variant="contained" fullWidth type="submit">
        Submit
      </Button>
    </form>
  );
};