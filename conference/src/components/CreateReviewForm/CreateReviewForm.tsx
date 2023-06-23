import { useFormik } from "formik";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useConferenceId } from "../../hooks/UseConferenceId";
import { useSubmissionId } from "../../hooks/UseSubmissionId";
import { Review } from "../../types/Conference";
import { FormErrorAlert } from "../FormErrorAlert/FormErrorAlert";
import { usePostCreateReviewApi, useUpdateReviewApi } from "./CreateReviewForm.hooks";
import { CreateReviewRequest, initialValues } from "./CreateReviewForm.types";
import { validationSchema } from "./CreateReviewForm.validator";

export const CreateReviewForm = ({ review }: { review?: Review }) => {
  const navigate = useNavigate();
  const conferenceId = useConferenceId();
  const submissionId = useSubmissionId();
  const { response: responseUpdate, put } = useUpdateReviewApi();
  const { response: responseCreate, post } = usePostCreateReviewApi(submissionId);

  const performRequest: Function = review ? put : post;
  const response = review ? responseUpdate : responseCreate;

  useEffect(() => {
    if (response.status === "success") {
      navigate(`/conferences/${conferenceId}/submissions/${submissionId}`);
    }
  }, [response, navigate, conferenceId, submissionId]);

  const values: CreateReviewRequest = review ? { ...review } : initialValues;

  const formik = useFormik({
    initialValues: values,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      performRequest(values);
    },
  });

  return (
    <Box component="form" mb={5} onSubmit={formik.handleSubmit}>
      <TextField
        fullWidth
        required
        margin="normal"
        id="evaluation"
        name="evaluation"
        label="Evaluation"
        multiline
        value={formik.values.evaluation}
        onChange={formik.handleChange}
        error={formik.touched.evaluation && Boolean(formik.errors.evaluation)}
        helperText={formik.touched.evaluation && formik.errors.evaluation}
        inputProps={{ maxLength: 1000 }}
      />
      <TextField
        fullWidth
        required
        margin="normal"
        id="score"
        name="score"
        label="Score"
        type="number"
        value={formik.values.score}
        onChange={formik.handleChange}
        error={formik.touched.score && Boolean(formik.errors.score)}
        helperText={formik.touched.score && formik.errors.score}
        inputProps={{ min: -10, max: 10 }}
      />
      <TextField
        fullWidth
        required
        margin="normal"
        id="confidence"
        name="confidence"
        label="Confidence"
        type="number"
        inputProps={{ min: 1, max: 5 }}
        value={formik.values.confidence}
        onChange={formik.handleChange}
        error={formik.touched.confidence && Boolean(formik.errors.confidence)}
        helperText={formik.touched.confidence && formik.errors.confidence}
      />
      <FormErrorAlert response={response} />
      <Button disabled={response.status === "loading"} color="primary" variant="contained" fullWidth type="submit">
        Submit
      </Button>
    </Box>
  );
};
