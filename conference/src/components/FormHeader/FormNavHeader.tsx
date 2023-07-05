import { Box, IconButton } from "@mui/material";
import { FormHeader } from "./FormHeader";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import { PropsWithChildren } from "react";

type FormNavHeaderProps = {
  route: string;
}

export const FormNavHeader = ({ route, children }: PropsWithChildren<FormNavHeaderProps>) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <IconButton onClick={() => navigate(route)}>
        <ArrowBackIcon />
      </IconButton>
      <FormHeader>{children}</FormHeader>
    </Box>
  );
}