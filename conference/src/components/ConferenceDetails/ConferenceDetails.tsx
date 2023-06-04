import dayjs from "dayjs";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { validationSchema } from "../CreateConferenceForm/CreateConferenceForm.validator";
import { useGetConferenceApi, useUpdateConferenceApi } from "./ConferenceDetails.hooks";
import { initialValues, UpdateConferenceRequest } from "./ConferenceDetails.types";

export const ConferenceDetails = () => {
  const { conferenceId } = useParams();
  const conference = useGetConferenceApi(Number(conferenceId));
  const { response, put } = useUpdateConferenceApi();
  const [isEdited, setIsEdited] = useState(false);

  const formik = useFormik({
    initialValues: conference.data ?? initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      put(values);
      setIsEdited(false);
    },
  });

  useEffect(() => {
    setIsEdited(false);
    if (conference.data) {
      formik.setValues(conference.data);
    }
  }, [conference, formik]);

  const handleFieldChange = (field: string, value: string | null | undefined) => {
    setIsEdited(true);
    formik.setFieldValue(field, value, true);
  };

  function generateTableRow(field: string, label: string, maxLength: number | undefined) {
    return (
      <TableRow key={field}>
        <TableCell variant="head">{label}</TableCell>
        <TableCell style={{ whiteSpace: "normal", wordBreak: "break-word" }}>
          <TextField
            size="small"
            margin="none"
            id={field}
            name={field}
            variant="standard"
            InputProps={{
              disableUnderline: true,
            }}
            onChange={(event) => handleFieldChange(field, event.target.value)}
            value={formik.values[field as keyof UpdateConferenceRequest]}
            error={
              formik.touched[field as keyof UpdateConferenceRequest] &&
              Boolean(formik.errors[field as keyof UpdateConferenceRequest])
            }
            helperText={
              formik.touched[field as keyof UpdateConferenceRequest] &&
              formik.errors[field as keyof UpdateConferenceRequest]
            }
            inputProps={{ maxLength: maxLength }}
          />
        </TableCell>
      </TableRow>
    );
  }

  function generateDateField(field: string, label: string) {
    return (
      <TableRow key={field}>
        <TableCell variant="head">{label}</TableCell>
        <TableCell>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label={label}
              value={dayjs(formik.values[field as keyof UpdateConferenceRequest])}
              onChange={(value) => handleFieldChange(field, value?.toString())}
              slotProps={{
                textField: {
                  id: field,
                  name: field,
                  margin: "none",
                  variant: "standard",
                  InputProps: {
                    disableUnderline: true,
                  },
                  error:
                    formik.touched[field as keyof UpdateConferenceRequest] &&
                    Boolean(formik.errors[field as keyof UpdateConferenceRequest]),
                  helperText:
                    formik.touched[field as keyof UpdateConferenceRequest] &&
                    formik.errors[field as keyof UpdateConferenceRequest],
                },
              }}
            />
          </LocalizationProvider>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <Box component="form" mb={5} onSubmit={formik.handleSubmit}>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableBody>
            {generateTableRow("title", "Title", 100)}
            {generateTableRow("acronym", "Acronym", 20)}
            {generateTableRow("abstract", "Abstract", 1000)}
            {generateTableRow("areaNotes", "Area Notes", 500)}
            {generateTableRow("keywords", "Keywords", 100)}
            {generateTableRow("organizer", "Organizer", 100)}
            {generateTableRow("organizerWebpage", "Organizer Webpage", 100)}
            {generateTableRow("primaryResearchArea", "Primary Research Area", 100)}
            {generateTableRow("secondaryResearchArea", "Secondary Research Area", 100)}
            {generateTableRow("city", "City", 50)}
            {generateTableRow("venue", "Venue", 100)}
            {generateTableRow("webpage", "Webpage", 100)}
            {generateDateField("startDate", "Start Date")}
            {generateDateField("endDate", "End Date")}
            <TableRow>
              <TableCell align="center" colSpan={12} variant="head">
                <Button color="inherit">
                  <Link className="header__link" to={`/conferences/${conferenceId}/participants`}>
                    Participants
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Collapse in={response.isError} sx={{ my: "10px" }}>
          <Alert severity="error">
            Something went wrong while updating the conference.
            <br />
            {response.error?.detail}
          </Alert>
        </Collapse>
        {isEdited && (
          <Button fullWidth sx={{ marginTop: 3 }} variant="contained" type="submit">
            Save
          </Button>
        )}
      </TableContainer>
    </Box>
  );
};
