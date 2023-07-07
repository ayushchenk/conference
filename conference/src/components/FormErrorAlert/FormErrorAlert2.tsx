import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import { useEffect, useState } from "react";
import { errorAlertTimeout } from "../../util/Constants";
import { AxiosError } from "axios";
import { ApiError } from "../../types/ApiResponse";

export const FormErrorAlert2 = ({ error }: { error: AxiosError<ApiError> | undefined }) => {
  const [visible, setVisible] = useState(!!error);

  useEffect(() => {
    setVisible(!!error);
    const timeout = setTimeout(() => setVisible(false), errorAlertTimeout);
    return () => clearTimeout(timeout);
  }, [error]);

  if (!error || !visible) {
    return null;
  }

  const apiError = error.response?.data;

  if (!apiError) {
    return (
      <Collapse in={true} sx={{ my: "10px" }}>
        <Alert severity="error">{"Something went wrong while processing the request"}</Alert>
      </Collapse>
    );
  }

  if (apiError.errors) {
    const errorMessages = Object.values(apiError.errors).flat();
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
      <Alert severity="error">{apiError?.detail ?? "Something went wrong while processing the request"}</Alert>
    </Collapse>
  );
};
