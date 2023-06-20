import { Box, Container, IconButton, Link } from "@mui/material";
import { SubmissionsGrid } from "../../components/SubmissionsGrid";
import { FormHeader } from "../../components/FormHeader";
import { useNavigate } from "react-router-dom";
import { useConferenceId } from "../../hooks/UseConferenceId";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const SubmissionsPage = () => {
  const navigate = useNavigate();
  const conferenceId = useConferenceId();

  return (
    <Container>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButton sx={{ margin: 0 }} onClick={() => navigate(`/conferences/${conferenceId}`)}>
          <ArrowBackIcon />
        </IconButton>
        <FormHeader> Submissions </FormHeader>
      </Box>
      <SubmissionsGrid />
    </Container>
  );
};
