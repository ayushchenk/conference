import { useFormik } from "formik";
import { ChangeEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UploadFile from "@mui/icons-material/UploadFile";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import { Submission } from "../../types/Conference";
import { buildFormData } from "../../util/Functions";
import { FormErrorAlert } from "../FormErrorAlert/FormErrorAlert";
import { usePostCreateSubmissionApi, useUpdateSubmissionApi } from "./CreateSubmissionForm.hooks";
import { CreateSubmissionRequest, initialValues } from "./CreateSubmissionForm.types";
import { createValidationSchema, updateValidationSchema } from "./CreateSubmissionForm.validator";
import { IconButton } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import { useConferenceId } from "../../hooks/UseConferenceId";

export const CreateSubmissionForm = ({ submission }: { submission?: Submission }) => {
  const navigate = useNavigate();
  const conferenceId = useConferenceId();
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
      <FormControl fullWidth error={formik.touched.mainFile && Boolean(formik.errors.mainFile)}>
        <Box sx={{ display: "flex", mt: 2 }}>
          {formik.values.mainFile &&
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <FormHelperText>{formik.values.mainFile?.name}</FormHelperText>
              <IconButton onClick={() => { formik.setFieldValue("mainFile", undefined) }}>
                <ClearIcon />
              </IconButton>
            </Box>
          }
          <Button fullWidth variant="outlined" component="label" startIcon={<UploadFile />}>
            Upload {submission ? 'New' : ''} Main File
            <input
              id="mainFile"
              name="mainFile"
              accept="application/pdf"
              type="file"
              hidden
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                if (event.target.files) {
                  formik.setFieldValue("mainFile", event.target.files[0]);
                }
              }}
            />
          </Button>
        </Box>
        {formik.touched.mainFile && formik.errors.mainFile && <FormHelperText>{formik.errors.mainFile}</FormHelperText>}
      </FormControl>
      <FormControl margin="dense" fullWidth error={formik.touched.anonymizedFile && Boolean(formik.errors.anonymizedFile)}>
        <Box sx={{ display: "flex", mt: 2 }}>
          {formik.values.anonymizedFile &&
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <FormHelperText>{formik.values.anonymizedFile?.name}</FormHelperText>
              <IconButton onClick={() => { formik.setFieldValue("anonymizedFile", undefined) }}>
                <ClearIcon />
              </IconButton>
            </Box>
          }
          <Button fullWidth variant="outlined" component="label" startIcon={<UploadFile />}>
            Upload {submission ? 'New' : ''} Anonymized File
            <input
              id="anonymizedFile"
              name="anonymizedFile"
              accept="application/pdf"
              type="file"
              hidden
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                if (event.target.files) {
                  formik.setFieldValue("anonymizedFile", event.target.files[0]);
                }
              }}
            />
          </Button>
        </Box>
        {formik.touched.anonymizedFile && formik.errors.anonymizedFile && <FormHelperText>{formik.errors.anonymizedFile}</FormHelperText>}
      </FormControl>
      <FormControl margin="dense" fullWidth error={formik.touched.presentationFile && Boolean(formik.errors.presentationFile)}>
        <Box sx={{ display: "flex", mt: 2 }}>
          {formik.values.presentationFile &&
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <FormHelperText>{formik.values.presentationFile?.name}</FormHelperText>
              <IconButton onClick={() => { formik.setFieldValue("presentationFile", undefined) }}>
                <ClearIcon />
              </IconButton>
            </Box>
          }
          <Button fullWidth variant="outlined" component="label" startIcon={<UploadFile />}>
            Upload {submission ? 'New' : ''} Presentation File
            <input
              id="presentationFile"
              name="presentationFile"
              type="file"
              hidden
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                if (event.target.files) {
                  formik.setFieldValue("presentationFile", event.target.files[0]);
                }
              }}
            />
          </Button>
        </Box>
        {formik.touched.presentationFile && formik.errors.presentationFile && <FormHelperText>{formik.errors.presentationFile}</FormHelperText>}
      </FormControl>
      <FormControl margin="dense" fullWidth error={formik.touched.otherFiles && Boolean(formik.errors.otherFiles)}>
        <Box sx={{ display: "flex", mt: 2 }}>
          {formik.values.otherFiles &&
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box>
                {formik.values.otherFiles.map((file, index) => (
                  <FormHelperText key={index}>{file.name}</FormHelperText>
                ))}
              </Box>
              <IconButton onClick={() => { formik.setFieldValue("otherFiles", undefined) }}>
                <ClearIcon />
              </IconButton>
            </Box>
          }
          <Button fullWidth variant="outlined" component="label" startIcon={<UploadFile />}>
            Upload {submission ? 'New' : ''} Other Files
            <input
              id="otherFiles"
              name="otherFiles"
              multiple
              type="file"
              hidden
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                if (event.target.files) {
                  formik.setFieldValue("otherFiles", Array.from(event.target.files));
                }
              }}
            />
          </Button>
        </Box>
        {formik.touched.otherFiles && formik.errors.otherFiles && <FormHelperText>{formik.errors.otherFiles}</FormHelperText>}
      </FormControl>
      <FormErrorAlert response={response} />
      <Button color="primary" variant="contained" fullWidth type="submit">
        Submit
      </Button>
    </Box>
  );
};
