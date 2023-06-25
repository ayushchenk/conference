import { Box, Button, TextField, Typography } from "@mui/material";
import { usePostSubmissionCommentApi } from "./CreateCommentForm.hooks";
import { NewCommentFormProps, initialValues } from "./CreateCommentForm.types";
import { validationSchema } from "./CreateCommentForm.validator";
import { useFormik } from "formik";
import { useEffect } from "react";
import { FormErrorAlert } from "../FormErrorAlert";

export const CreateCommentForm = ({
  submissionId,
  onCreate
}: NewCommentFormProps) => {
  const { response, post } = usePostSubmissionCommentApi(submissionId);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      post(values);
    },
  });

  useEffect(() => {
    if (response.status === "success") {
      onCreate(response.data);
      formik.resetForm();
    }
  }, [response, onCreate]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box component="form" onSubmit={formik.handleSubmit}>
      <Typography variant="body1">Leave a comment</Typography>
      <TextField
        fullWidth
        required
        multiline
        minRows={3}
        margin="normal"
        id="text"
        name="text"
        label="Text"
        value={formik.values.text}
        onChange={formik.handleChange}
        error={formik.touched.text && Boolean(formik.errors.text)}
        helperText={formik.touched.text && formik.errors.text}
        inputProps={{ maxLength: 1000 }}
      />
      <FormErrorAlert response={response} />
      <Button
        disabled={response.status === "loading"}
        color="primary"
        variant="contained"
        fullWidth
        type="submit">
        Submit
      </Button>
    </Box>
  );
}