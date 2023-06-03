import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { usePostCreateConferenceApi } from "./CreateConferenceForm.hooks";
import { validationSchema } from "./CreateConferenceForm.validator";
import { initialValues } from "./CreateConferenceForm.types";

export const CreateConferenceForm = () => {
  const { response, post } = usePostCreateConferenceApi();
  const navigate = useNavigate();

  useEffect(() => {
    if (response.data && "id" in response.data) {
      navigate(`/conferences/${response.data.id}`);
    }
  }, [response, navigate]);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      post(values);
    },
  });

  return (
    <Box component="form" mb={5} onSubmit={formik.handleSubmit}>
      <TextField
        fullWidth
        required
        margin="normal"
        id="title"
        name="title"
        label="Title"
        value={formik.values.title}
        onChange={formik.handleChange}
        error={formik.touched.title && Boolean(formik.errors.title)}
        helperText={formik.touched.title && formik.errors.title}
        inputProps={{ maxLength: 100 }}
      />
      <TextField
        fullWidth
        required
        margin="normal"
        id="acronym"
        name="acronym"
        label="Acronym"
        value={formik.values.acronym}
        onChange={formik.handleChange}
        error={formik.touched.acronym && Boolean(formik.errors.acronym)}
        helperText={formik.touched.acronym && formik.errors.acronym}
        inputProps={{ maxLength: 20 }}
      />
      <TextField
        fullWidth
        margin="normal"
        id="keywords"
        name="keywords"
        label="Keywords"
        value={formik.values.keywords}
        onChange={formik.handleChange}
        error={formik.touched.keywords && Boolean(formik.errors.keywords)}
        helperText={formik.touched.keywords && formik.errors.keywords}
        inputProps={{ maxLength: 20 }}
      />
      <TextField
        fullWidth
        multiline
        margin="normal"
        id="abstract"
        name="abstract"
        label="Abstract"
        value={formik.values.abstract}
        onChange={formik.handleChange}
        error={formik.touched.abstract && Boolean(formik.errors.abstract)}
        helperText={formik.touched.abstract && formik.errors.abstract}
        inputProps={{ maxLength: 1000 }}
      />
      <TextField
        fullWidth
        margin="normal"
        id="webpage"
        name="webpage"
        label="Webpage"
        value={formik.values.webpage}
        onChange={formik.handleChange}
        error={formik.touched.webpage && Boolean(formik.errors.webpage)}
        helperText={formik.touched.webpage && formik.errors.webpage}
        inputProps={{ maxLength: 100 }}
      />
      <TextField
        fullWidth
        margin="normal"
        id="venue"
        name="venue"
        label="Venue"
        value={formik.values.venue}
        onChange={formik.handleChange}
        error={formik.touched.venue && Boolean(formik.errors.venue)}
        helperText={formik.touched.venue && formik.errors.venue}
        inputProps={{ maxLength: 100 }}
      />
      <TextField
        fullWidth
        margin="normal"
        id="city"
        name="city"
        label="City"
        value={formik.values.city}
        onChange={formik.handleChange}
        error={formik.touched.city && Boolean(formik.errors.city)}
        helperText={formik.touched.city && formik.errors.city}
        inputProps={{ maxLength: 50 }}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Start date"
          value={dayjs(formik.values.startDate)}
          onChange={(value) => formik.setFieldValue("startDate", value, true)}
          slotProps={{
            textField: {
              id: "startDate",
              name: "startDate",
              margin: "normal",
              fullWidth: true,
              required: true,
              variant: "outlined",
              error: formik.touched.startDate && Boolean(formik.errors.startDate),
            },
          }}
        />
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="End date"
          value={dayjs(formik.values.endDate)}
          onChange={(value) => formik.setFieldValue("endDate", value, true)}
          slotProps={{
            textField: {
              id: "endDate",
              name: "endDate",
              margin: "normal",
              fullWidth: true,
              required: true,
              variant: "outlined",
              error: formik.touched.endDate && Boolean(formik.errors.endDate),
            },
          }}
        />
      </LocalizationProvider>
      <TextField
        fullWidth
        margin="normal"
        id="primaryResearchArea"
        name="primaryResearchArea"
        label="Primary research area"
        value={formik.values.primaryResearchArea}
        onChange={formik.handleChange}
        error={formik.touched.primaryResearchArea && Boolean(formik.errors.primaryResearchArea)}
        helperText={formik.touched.primaryResearchArea && formik.errors.primaryResearchArea}
        inputProps={{ maxLength: 100 }}
      />
      <TextField
        fullWidth
        margin="normal"
        id="secondaryResearchArea"
        name="secondaryResearchArea"
        label="Secondary research area"
        value={formik.values.secondaryResearchArea}
        onChange={formik.handleChange}
        error={formik.touched.secondaryResearchArea && Boolean(formik.errors.secondaryResearchArea)}
        helperText={formik.touched.secondaryResearchArea && formik.errors.secondaryResearchArea}
        inputProps={{ maxLength: 100 }}
      />
      <TextField
        fullWidth
        multiline
        margin="normal"
        id="areaNotes"
        name="areaNotes"
        label="Area notes"
        value={formik.values.areaNotes}
        onChange={formik.handleChange}
        error={formik.touched.areaNotes && Boolean(formik.errors.areaNotes)}
        helperText={formik.touched.areaNotes && formik.errors.areaNotes}
        inputProps={{ maxLength: 500 }}
      />
      <TextField
        fullWidth
        required
        margin="normal"
        id="organizer"
        name="organizer"
        label="Organizer"
        value={formik.values.organizer}
        onChange={formik.handleChange}
        error={formik.touched.organizer && Boolean(formik.errors.organizer)}
        helperText={formik.touched.organizer && formik.errors.organizer}
        inputProps={{ maxLength: 100 }}
      />
      <TextField
        fullWidth
        margin="normal"
        id="organizerWebpage"
        name="organizerWebpage"
        label="Organizer webpage"
        value={formik.values.organizerWebpage}
        onChange={formik.handleChange}
        error={formik.touched.organizerWebpage && Boolean(formik.errors.organizerWebpage)}
        helperText={formik.touched.organizerWebpage && formik.errors.organizerWebpage}
        inputProps={{ maxLength: 100 }}
      />
      <TextField
        fullWidth
        margin="normal"
        id="contactPhoneNumber"
        name="contactPhoneNumber"
        label="Contact phone number"
        value={formik.values.contactPhoneNumber}
        onChange={formik.handleChange}
        error={formik.touched.contactPhoneNumber && Boolean(formik.errors.contactPhoneNumber)}
        helperText={formik.touched.contactPhoneNumber && formik.errors.contactPhoneNumber}
        inputProps={{ maxLength: 20 }}
      />
      <Collapse in={response.isError} sx={{ my: "10px" }}>
        <Alert severity="error">
          Something went wrong while creating the conference.
          <br />
          {response.error?.detail}
        </Alert>
      </Collapse>
      <Button color="primary" variant="contained" fullWidth type="submit">
        Submit
      </Button>
    </Box>
  );
};
