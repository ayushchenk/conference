import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Auth } from "../../util/Auth";
import { FormErrorAlert } from "../FormErrorAlert/FormErrorAlert";
import { usePostSignUpApi } from "./SignUpForm.hooks";
import { initialValues } from "./SignUpForm.types";
import { digitRegex, lowerCaseRegex, nonAlpaCharRegex, requiredPasswordLength, upperCaseRegex, validationSchema } from "./SignUpForm.validator";
import { useCallback, useEffect, useState } from "react";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { InputAdornment, IconButton, FormHelperText, FormControl, InputLabel, OutlinedInput } from "@mui/material";

export const SignUpForm: React.FC<{}> = () => {
  const [passwordLengthValid, setPasswordLengthValid] = useState(false);
  const [passwordDigitValid, setPasswordDigitValid] = useState(false);
  const [passwordLowerCaseValid, setPasswordLowerCaseValid] = useState(false);
  const [passwordUpperCaseValid, setPasswordUppserCaseValid] = useState(false);
  const [passwordNonAlpaValid, setPasswordNonAlpaValid] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const { response, post } = usePostSignUpApi();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      post(values);
    }
  });

  useEffect(() => {
    if (response.data) {
      Auth.login(response.data);
      navigate("/");
    }
  }, [response, navigate]);

  const handlePasswordChange = useCallback((password: string) => {
    setPasswordLengthValid(password.length >= requiredPasswordLength);
    setPasswordDigitValid(digitRegex.test(password));
    setPasswordLowerCaseValid(lowerCaseRegex.test(password));
    setPasswordUppserCaseValid(upperCaseRegex.test(password));
    setPasswordNonAlpaValid(nonAlpaCharRegex.test(password));
  }, []);

  const handleMouseDownPassword = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  }, []);

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
      <FormControl variant="outlined" margin="normal" fullWidth>
        <InputLabel>Password</InputLabel>
        <OutlinedInput
          required
          label="Password"
          id="password"
          name="password"
          value={formik.values.password}
          onBlur={formik.handleBlur}
          onChange={(event) => {
            formik.handleChange(event);
            handlePasswordChange(event.target.value);
          }}
          type={showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword((show) => !show)}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
        <FormHelperText sx={{ color: formik.touched.password ? (passwordLengthValid ? "green" : "red") : "grey" }}>Password must be of minimum 8 characters length</FormHelperText>
        <FormHelperText sx={{ color: formik.touched.password ? (passwordDigitValid ? "green" : "red") : "grey" }}>Password must have at least one digit</FormHelperText>
        <FormHelperText sx={{ color: formik.touched.password ? (passwordLowerCaseValid ? "green" : "red") : "grey" }}>Password must have at least one lower-case letter (a-z)</FormHelperText>
        <FormHelperText sx={{ color: formik.touched.password ? (passwordUpperCaseValid ? "green" : "red") : "grey" }}>Password must have at least one upper-case letter (A-Z)</FormHelperText>
        <FormHelperText sx={{ color: formik.touched.password ? (passwordNonAlpaValid ? "green" : "red") : "grey" }}>Password must have at least one non-alphabetical character (!, @, #, etc.)</FormHelperText>
      </FormControl>
      <TextField
        fullWidth
        required
        margin="normal"
        id="passwordRepeat"
        name="passwordRepeat"
        label="Repeat password"
        type="password"
        value={formik.values.passwordRepeat}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        error={formik.touched.passwordRepeat && Boolean(formik.errors.passwordRepeat)}
        helperText={formik.touched.passwordRepeat && formik.errors.passwordRepeat}
        inputProps={{ maxLength: 100 }}
        InputProps={{
          type: showRepeatPassword ? 'text' : 'password',
          endAdornment:
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowRepeatPassword((show) => !show)}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showRepeatPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
        }}
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
