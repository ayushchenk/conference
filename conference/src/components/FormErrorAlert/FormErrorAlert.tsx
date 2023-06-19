import Alert from "@mui/material/Alert";
import { FormErrorAlertProps } from "./FormErrorAlert.types";
import Collapse from "@mui/material/Collapse";
import { useEffect, useState } from "react";
import { errorAlertTimeout } from "../../util/Constants";

export const FormErrorAlert = ({ response }: FormErrorAlertProps) => {
  const [visible, setVisible] = useState(response.status === "error");

  useEffect(() => {
    setVisible(response.status === "error");
    const timeout = setTimeout(() => setVisible(false), errorAlertTimeout);
    return () => clearTimeout(timeout);
  }, [response]);

  if (response.status !== "error" || !visible) {
    return null;
  }

  if (response.error.errors) {
    const errorMessages = Object.values(response.error.errors).flat();
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
      <Alert severity="error">{response.error.detail ?? "Something went wrong while processing the request"}</Alert>
    </Collapse>
  );
};
