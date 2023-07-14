import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import { useEffect, useState } from "react";
import { errorAlertTimeout } from "../../util/Constants";
import { FormSwrErrorAlertProps } from "./FormErrorAlert.types";

export const FormSwrErrorAlert = ({ response }: FormSwrErrorAlertProps) => {
  const error = response.error?.response?.data;

  const [visible, setVisible] = useState(!!error);

  useEffect(() => {
    setVisible(!!error);
    const timeout = setTimeout(() => setVisible(false), errorAlertTimeout);
    return () => clearTimeout(timeout);
  }, [error]);

  if (!error || !visible) {
    return null;
  }

  if (error.errors) {
    const errorMessages = Object.values(error.errors).flat();
    if (errorMessages.length > 0) {
      return (
        <Collapse in={true} sx={{ my: "10px" }}>
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
    <Collapse in={true} sx={{ my: "10px" }}>
      <Alert severity="error">{error?.detail ?? "Something went wrong while processing the request"}</Alert>
    </Collapse>
  );
};
