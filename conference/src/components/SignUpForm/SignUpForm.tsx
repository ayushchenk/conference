import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Auth } from "../../util/Auth";
import { FormErrorAlert } from "../FormErrorAlert/FormErrorAlert";
import { usePostSignUpApi } from "./SignUpForm.hooks";
import { initialValues } from "./SignUpForm.types";
import { validationSchema } from "./SignUpForm.validator";
import { useEffect } from "react";

export const SignUpForm: React.FC<{}> = () => {
  const { response, post } = usePostSignUpApi();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      post(values);
    },
  });

  useEffect(() => {
    if (response.data) {
      Auth.login(response.data);
      navigate("/");
    }
  }, [response, navigate]);

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
        inputProps={{ maxLength: 256 }}
      />
      <TextField
        fullWidth
        required
        margin="normal"
        id="firstName"
        name="firstName"
        label="First Name"
        type="text"
        value={formik.values.firstName}
        onChange={formik.handleChange}
        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
        helperText={formik.touched.firstName && formik.errors.firstName}
        inputProps={{ maxLength: 50 }}
      />
      <TextField
        fullWidth
        required
        margin="normal"
        id="lastName"
        name="lastName"
        label="Last Name"
        type="text"
        value={formik.values.lastName}
        onChange={formik.handleChange}
        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
        helperText={formik.touched.lastName && formik.errors.lastName}
        inputProps={{ maxLength: 50 }}
      />
      <TextField
        fullWidth
        required
        margin="normal"
        id="country"
        name="country"
        label="Country"
        type="text"
        value={formik.values.country}
        onChange={formik.handleChange}
        error={formik.touched.country && Boolean(formik.errors.country)}
        helperText={formik.touched.country && formik.errors.country}
        inputProps={{ maxLength: 50 }}
      />
      <TextField
        fullWidth
        required
        margin="normal"
        id="affiliation"
        name="affiliation"
        label="Affiliation"
        type="text"
        value={formik.values.affiliation}
        onChange={formik.handleChange}
        error={formik.touched.affiliation && Boolean(formik.errors.affiliation)}
        helperText={formik.touched.affiliation && formik.errors.affiliation}
        inputProps={{ maxLength: 100 }}
      />
      <TextField
        fullWidth
        margin="normal"
        id="webpage"
        name="webpage"
        label="Webpage"
        type="text"
        value={formik.values.webpage}
        onChange={formik.handleChange}
        error={formik.touched.webpage && Boolean(formik.errors.webpage)}
        helperText={formik.touched.webpage && formik.errors.webpage}
        inputProps={{ maxLength: 100 }}
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
        inputProps={{ maxLength: 100 }}
      />
      <TextField
        fullWidth
        required
        margin="normal"
        id="passwordRepeat"
        name="passwordRepeat"
        label="Repeat password"
        type="password"
        value={formik.values.passwordRepeat}
        onChange={formik.handleChange}
        error={formik.touched.passwordRepeat && Boolean(formik.errors.passwordRepeat)}
        helperText={formik.touched.passwordRepeat && formik.errors.passwordRepeat}
        inputProps={{ maxLength: 100 }}
      />
      <TextField
        fullWidth
        margin="normal"
        id="inviteCode"
        name="inviteCode"
        label="Invitation code"
        placeholder="Leave empty to join the conference later"
        type="text"
        value={formik.values.inviteCode}
        onChange={formik.handleChange}
        error={formik.touched.inviteCode && Boolean(formik.errors.inviteCode)}
        helperText={formik.touched.inviteCode && formik.errors.inviteCode}
        inputProps={{ maxLength: 20 }}
      />
      <FormErrorAlert response={response} />
      <Button
        disabled={response.status === "loading"}
        color="primary"
        variant="contained"
        fullWidth
        sx={{ mt: 2 }}
        type="submit">
        Submit
      </Button>
    </form>
  );
};
