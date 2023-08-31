import { Dialog, DialogTitle, DialogContent, Button, Alert, Collapse } from "@mui/material";
import { UploadPresentationDialogProps, UploadPresentationRequest } from "./UploadPresentationDialog.types";
import { useFormik } from "formik";
import { validationSchema } from "./UploadPresentationDialog.validator";
import { useContext, useEffect } from "react";
import { SubmissionContext } from "../../contexts/SubmissionContext";
import { useUploadPresentationApi } from "./UploadPresentationDialog.hooks";
import { buildFormData } from "../../util/Functions";
import { FormErrorAlert } from "../FormErrorAlert";
import { UploadFileControl } from "../Util/UploadFileControl";

export const UploadPresentationDialog = (props: UploadPresentationDialogProps) => {
  const context = useContext(SubmissionContext);

  const { response, post, reset } = useUploadPresentationApi(context.submissionId);

  const formik = useFormik<UploadPresentationRequest>({
    initialValues: {},
    validationSchema: validationSchema,
    onSubmit: (values) => post(buildFormData(values))
  });

  useEffect(() => {
    if (response.status === "success") {
      const timeout = setTimeout(() => {
        formik.resetForm();
        reset();
        props.onClose();
      }, 3500);

      return () => clearTimeout(timeout);
    }
  }, [response.status, formik, props, reset]);

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>Upload new presentation file</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <UploadFileControl
            formik={formik}
            field="file"
            label="Select file"
            mimeType="application/vnd.openxmlformats-officedocument.presentationml.presentation"
          />
          <Button
            disabled={response.status === "loading" || !formik.values.file}
            sx={{ mt: 2 }}
            color="primary"
            variant="contained"
            fullWidth
            type="submit">
            Submit
          </Button>
        </form>
        <FormErrorAlert response={response} />
        <Collapse in={response.status === "success"} sx={{ my: "10px" }}>
          <Alert severity="success">Success</Alert>
        </Collapse>
      </DialogContent>
    </Dialog>
  );
}