import { Box, Container, IconButton } from "@mui/material";
import { CreateConferenceForm } from "../../components/CreateConferenceForm";
import { FormHeader } from "../../components/FormHeader";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const CreateConferencePage = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButton onClick={() => navigate(`/`)}>
          <ArrowBackIcon />
        </IconButton>
        <FormHeader>Create conference</FormHeader>
      </Box>
      <CreateConferenceForm />
    </Container>
  );
};
