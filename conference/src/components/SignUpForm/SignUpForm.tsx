import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import { usePostSignUpApi } from "./SignUpForm.hooks";
import { validationSchema } from "./SignUpForm.validator";

interface SignUpFormProps {
  logIn: Function;
}

export const SignUpForm: React.FC<SignUpFormProps> = ({ logIn }) => {
  const { data, isError, isLoading, post } = usePostSignUpApi();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      country: "",
      affiliation: "",
      webpage: "",
      password1: "",
      password2: ""
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const formData = {
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        country: values.country,
        affiliation: values.affiliation,
        webpage: values.webpage,
        password: values.password1
      };
      post(formData);
    },
  });
  
  if (!isLoading && !isError) {
    if (data && "token" in data) {
      logIn(data["token"]["accessToken"]);
    }
    navigate("/");
  };

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
        id="firstName"
        name="firstName"
        label="First Name"
        type="text"
        value={formik.values.firstName}
        onChange={formik.handleChange}
        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
        helperText={formik.touched.firstName && formik.errors.firstName}
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
      />
      <TextField
        fullWidth
        required
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
        required
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