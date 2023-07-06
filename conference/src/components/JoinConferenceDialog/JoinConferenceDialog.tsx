import { Dialog, DialogTitle, DialogContent, Button, TextField, Collapse, Alert } from "@mui/material";
import { FormErrorAlert } from "../FormErrorAlert";
import { JoinConferenceDialogProps, initialValues } from "./JoinConferenceDialog.types";
import { useJoinConferenceApi } from "./JoinConferenceDialog.hooks";
import { useFormik } from "formik";
import { validationSchema } from "./JoinConferenceDialog.validator";
import { Auth } from "../../util/Auth";

export const JoinConferenceDialog = (props: JoinConferenceDialogProps) => {
  const { response, post } = useJoinConferenceApi();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      post(values);
    }
  });

  if (response.status === "success") {
    Auth.login(response.data);
    props.onSuccess();
  }

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>Join conference using code</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            required
            margin="normal"
            id="code"
            name="code"
            label="Code"
            value={formik.values.code}
            onChange={formik.handleChange}
            error={formik.touched.code && Boolean(formik.errors.code)}
            helperText={formik.touched.code && formik.errors.code}
            inputProps={{ maxLength: 20 }}
          />
          <Button
            disabled={response.status === "loading"}
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