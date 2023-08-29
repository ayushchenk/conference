import { useFormik } from "formik";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Submission } from "../../types/Conference";
import { buildFormData } from "../../util/Functions";
import { FormErrorAlert } from "../FormErrorAlert/FormErrorAlert";
import { usePostCreateSubmissionApi, useUpdateSubmissionApi } from "./CreateSubmissionForm.hooks";
import { CreateSubmissionRequest, initialValues } from "./CreateSubmissionForm.types";
import { createValidationSchema, updateValidationSchema } from "./CreateSubmissionForm.validator";
import { Alert, Autocomplete, Chip } from "@mui/material";
import { useConferenceId } from "../../hooks/UseConferenceId";
import { useGetConferenceApi } from "../ConferenceDetails/ConferenceDetails.hooks";
import { UploadFileControl } from "../Util/UploadFileControl";
import { UploadFilesControl } from "../Util/UploadFilesControl";
import { maxSubmissionFileSizeMB } from "../../util/Constants";

export const CreateSubmissionForm = ({ submission }: { submission?: Submission }) => {
  const navigate = useNavigate();
  const conferenceId = useConferenceId();
  const conference = useGetConferenceApi(conferenceId);
  const { response: responseUpdate, put } = useUpdateSubmissionApi();
  const { response: responseCreate, post } = usePostCreateSubmissionApi();

  const performRequest: Function = submission ? put : post;
  const response = submission ? responseUpdate : responseCreate;
  const validationSchema = submission ? updateValidationSchema : createValidationSchema;

  useEffect(() => {
    const submissionId = submission ? submission.id : response?.data?.id;
    if (response.status === "success" && submissionId) {
      navigate(`/conferences/${conferenceId}/submissions/${submissionId}`);
    }
  }, [response, navigate, conferenceId, submission]);

  const values: CreateSubmissionRequest = submission
    ? { ...submission }
    : { ...initialValues, conferenceId: conferenceId }

  const formik = useFormik({
    initialValues: values,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      performRequest(buildFormData(values));
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
        id="keywords"
        name="keywords"
        label="Keywords"
        value={formik.values.keywords}
        onChange={formik.handleChange}
        error={formik.touched.keywords && Boolean(formik.errors.keywords)}
        helperText={formik.touched.keywords && formik.errors.keywords}
        inputProps={{ maxLength: 100 }}
      />
      <Autocomplete
        multiple
        options={conference.data?.researchAreas ?? []}
        onChange={(_, value) => formik.setFieldValue("researchAreas", value)}
        value={formik.values.researchAreas}
        renderTags={(value: readonly string[], getTagProps) =>
          value.map((option: string, index: number) => (
            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            margin="normal"
            onKeyDown={(e) => e.preventDefault()}
            error={formik.touched.researchAreas && Boolean(formik.errors.researchAreas)}
            helperText={formik.touched.researchAreas && formik.errors.researchAreas}
            label="Research Areas *"
            sx={{ caretColor: "transparent" }}
          />
        )}
      />
      <TextField
        fullWidth
        multiline
        required
        margin="normal"
        id="abstract"
        name="abstract"
        label="Abstract"
        minRows={3}
        value={formik.values.abstract}
        onChange={formik.handleChange}
        error={formik.touched.abstract && Boolean(formik.errors.abstract)}
        helperText={formik.touched.abstract && formik.errors.abstract}
        inputProps={{ maxLength: 1000 }}
      />
      <Alert sx={{ mt: 1 }} severity="info">Maximum file size if {maxSubmissionFileSizeMB} MB</Alert>
      <UploadFileControl
        formik={formik}
        field="mainFile"
        label={submission ? 'Upload New Main File' : 'Upload Main File *'}
        mimeType="application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      />
      <UploadFileControl
        formik={formik}
        field="anonymizedFile"
        label={`Upload ${submission ? 'New' : ''} Anonymized File`}
        mimeType="application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      />
      <UploadFileControl
        formik={formik}
        field="presentationFile"
        label={`Upload ${submission ? 'New' : ''} Presentation File`}
        mimeType="application/vnd.openxmlformats-officedocument.presentationml.presentation"
      />
      <UploadFilesControl
        formik={formik}
        field="otherFiles"
        label={`Upload ${submission ? 'New' : ''} Other Files`}
      />
      <FormErrorAlert response={response} />
      <FormErrorAlert response={conference} />
      <Button
        disabled={response.status === "loading"}
        color="primary"
        variant="contained"
        fullWidth
        sx={{ mt: 3 }}
        type="submit">
        Submit
      </Button>
    </Box>
  );
};
