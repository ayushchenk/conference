import { useFormik } from "formik";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import TextField from "@mui/material/TextField";
import { Auth } from "../../logic/Auth";
import { FormErrorAlert } from "../FormErrorAlert/FormErrorAlert";
import { usePostLoginApi } from "./LoginForm.hooks";
import { validationSchema } from "./LoginForm.validator";

export const LoginForm: React.FC<{}> = () => {
  const { response, post } = usePostLoginApi();
  const navigate = useNavigate();

  useEffect(() => {
    if (Auth.isAuthed()) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    if (response.data) {
      Auth.login(response.data);
      navigate("/");
    }
  }, [response, navigate]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      post(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        fullWidth
        required
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
        required
        margin="normal"
        id="password"
        name="password"
        label="Password"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
      />
      <Collapse in={response.isError} sx={{ my: "10px" }} timeout={5}>
        <FormErrorAlert error={response.error} />
      </Collapse>
      <Button color="primary" variant="contained" fullWidth type="submit">
        Submit
      </Button>
    </form>
  );
};
