import Alert from "@mui/material/Alert";
import { ApiError } from "../../types/ApiResponse";

export const FormErrorAlert = ({ error }: { error: ApiError | null }) => {
  const errors = error?.errors;
  if (errors) {
    const errorMessages = Object.values(errors).flat();
    if (errorMessages.length > 0) {
      return (
        <>
          {errorMessages.map((errorMessage, index) => (
            <Alert severity="error" key={index}>
              {errorMessage}
            </Alert>
          ))}
        </>
      );
    }
  }
  return <Alert severity="error">{error?.detail ?? "Something went wrong while processing the request."}</Alert>;
};
