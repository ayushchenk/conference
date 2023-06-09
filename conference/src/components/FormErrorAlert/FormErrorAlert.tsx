import Alert from "@mui/material/Alert";
import { FormErrorAlertProps } from "./FormErrorAlert.types";
import Collapse from "@mui/material/Collapse";

export const FormErrorAlert = ({ response }: FormErrorAlertProps) => {
  const errors = response.error?.errors;

  if (errors) {
    const errorMessages = Object.values(errors).flat();
    if (errorMessages.length > 0) {
      return (
        <Collapse in={response.isError} sx={{ my: "10px" }}>
          {errorMessages.map((errorMessage, index) => (
            <Alert severity="error" key={index}>
              {errorMessage}
            </Alert>
          ))}
        </Collapse>
      );
    }
  }
  return (
    <Collapse in={response.isError} sx={{ my: "10px" }}>
      <Alert severity="error">{response.error?.detail ?? "Something went wrong while processing the request."}</Alert>
    </Collapse>
  );
};
