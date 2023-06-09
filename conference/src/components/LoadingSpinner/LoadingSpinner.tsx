import { CircularProgress } from "@mui/material";

export const LoadingSpinner = () => {
  return (
    <CircularProgress sx={{ position: "absolute", top: "50%", left: "50%" }} />
  );
}