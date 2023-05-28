import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import { usePostLoginApi } from "./LoginForm.hooks";
import { validationSchema } from "./LoginForm.validator";
import { Auth } from "../../logic/Auth";

export const LoginForm: React.FC<{}> = () => {
  const { data, isError, isLoading, post } = usePostLoginApi();
  const navigate = useNavigate();

  useEffect(() => {
    if (Auth.isAuthed()) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (!isLoading && !isError && data) {
      Auth.login(data);
      navigate("/");
    }
  }, [data, isError, isLoading]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: post,
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
      <Collapse in={isError} sx={{ my: "10px" }}>
        <Alert severity="error">Something went wrong while signing in.</Alert>
      </Collapse>
      <Button color="primary" variant="contained" fullWidth type="submit">
        Submit
      </Button>
    </form>
  );
};
