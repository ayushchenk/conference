import { Box, Button, TextField } from "@mui/material";
import { useCreateSubmissionCommentApi, useUpdateSubmissionCommentApi } from "./CreateCommentForm.hooks";
import { CreateCommentFormProps, initialValues } from "./CreateCommentForm.types";
import { validationSchema } from "./CreateCommentForm.validator";
import { useFormik } from "formik";
import { useEffect } from "react";
import { FormApiErrorAlert } from "../FormErrorAlert";

export const CreateCommentForm = ({
  submissionId,
  comment,
  onCreate
}: CreateCommentFormProps) => {
  const { response : createResponse, post } = useCreateSubmissionCommentApi(submissionId);
  const { response : updateResponse, put } = useUpdateSubmissionCommentApi();
  const response = comment ? updateResponse : createResponse;
  const operation: Function = comment ? put : post;

  const formik = useFormik({
    initialValues: comment ? {...comment} : initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      operation(values);
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
      <FormApiErrorAlert response={response} />
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