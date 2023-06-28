import { useFormik } from "formik";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField } from "@mui/material";
import { useConferenceId } from "../../hooks/UseConferenceId";
import { useSubmissionId } from "../../hooks/UseSubmissionId";
import { Review } from "../../types/Conference";
import { FormErrorAlert } from "../FormErrorAlert/FormErrorAlert";
import { usePostCreateReviewApi, useUpdateReviewApi } from "./CreateReviewForm.hooks";
import { CreateReviewRequest, initialValues } from "./CreateReviewForm.types";
import { validationSchema } from "./CreateReviewForm.validator";

export const CreateReviewForm = ({
  review,
  onSuccess,
  onUpdate,
}: {
  review?: Review | null;
  onSuccess: () => void;
  onUpdate?: (review: Review) => void;
}) => {
  const navigate = useNavigate();
  const conferenceId = useConferenceId();
  const submissionId = useSubmissionId();
  const { response: updateResponse, put } = useUpdateReviewApi();
  const { response: createResponse, post } = usePostCreateReviewApi(submissionId);

  const performRequest: Function = review ? put : post;
  const response = review ? updateResponse : createResponse;

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

  useEffect(() => {
    if (response.status === "success") {
      onSuccess();
      if (review && onUpdate) {
        const data = response.data as Review;
        onUpdate(data);
      }
      formik.resetForm();
    }
  }, [response, onSuccess]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box component="form" onSubmit={formik.handleSubmit}>
      <TextField
        fullWidth
        required
        margin="normal"
        id="evaluation"
        name="evaluation"
        label="Evaluation"
        placeholder="Provide descriptive evaluation of the submission"
        minRows={5}
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
        placeholder="Enter score from -10 to 10"
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
      <Button disabled={response.status === "loading"} sx={{ mt: 2 }} color="primary" variant="contained" fullWidth type="submit">
        Submit
      </Button>
    </Box>
  );
};
