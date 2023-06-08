import { useFormik } from "formik";
import { ChangeEvent, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UploadFile from "@mui/icons-material/UploadFile";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import { ApiResponse, CreateResponseData } from "../../types/ApiResponse";
import { Submission } from "../../types/Conference";
import { buildFormData } from "../../util/Functions";
import { usePostCreateSubmissionApi, useUpdateSubmissionApi } from "./CreateSubmissionForm.hooks";
import { initialValues } from "./CreateSubmissionForm.types";
import { createValidationSchema, updateValidationSchema } from "./CreateSubmissionForm.validator";

export const CreateSubmissionForm = ({ submission }: { submission?: Submission | null }) => {
  const navigate = useNavigate();
  const { conferenceId } = useParams();
  const { response: responseUpdate, put } = useUpdateSubmissionApi();
  const { response: responseCreate, post } = usePostCreateSubmissionApi();

  let performRequest: Function;
  let response: ApiResponse<CreateResponseData | Submission>;
  let validationSchema;

  if (submission === undefined) {
    performRequest = post;
    response = responseCreate;
    validationSchema = createValidationSchema;
  } else {
    performRequest = put;
    response = responseUpdate;
    validationSchema = updateValidationSchema;
  }

  useEffect(() => {
    let submissionId;
    if (submission) {
      submissionId = submission.id;
    } else {
      submissionId = response?.data?.id;
    }
    if (!response.isLoading && !response.isError && submissionId) {
      navigate(`/conferences/${conferenceId}/submissions/${submissionId}`);
    }
  }, [response, navigate, conferenceId, submission]);

  const formik = useFormik({
    initialValues: { ...(submission || initialValues), conferenceId: Number(conferenceId) },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      performRequest(buildFormData(values));
    },
  });

  useEffect(() => {
    if (submission && !formik.dirty) {
      formik.setValues(submission);
    }
  }, [submission, formik]);

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
        id="keywords"
        name="keywords"
        label="Keywords"
        value={formik.values.keywords}
        onChange={formik.handleChange}
        error={formik.touched.keywords && Boolean(formik.errors.keywords)}
        helperText={formik.touched.keywords && formik.errors.keywords}
        inputProps={{ maxLength: 100 }}
      />
      <TextField
        fullWidth
        multiline
        required
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
      <FormControl fullWidth error={formik.touched.file && Boolean(formik.errors.file)}>
        <Button fullWidth sx={{ mt: 1 }} variant="outlined" component="label" startIcon={<UploadFile />}>
          Upload File
          <input
            name="file"
            accept="application/pdf"
            id="submission-file"
            type="file"
            hidden
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              if (event.target.files) {
                formik.setFieldValue("file", event.target.files[0]);
              }
            }}
          />
        </Button>
        <FormHelperText>{formik.values.file?.name}</FormHelperText>
        {formik.touched.file && formik.errors.file && <FormHelperText>{formik.errors.file}</FormHelperText>}
      </FormControl>
      <Collapse in={response.isError} sx={{ my: "10px" }}>
        <Alert severity="error">
          Something went wrong while creating the submission.
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