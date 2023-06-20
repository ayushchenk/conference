import { Box, Container, IconButton } from "@mui/material";
import { ConferenceParticipantsGrid } from "../../components/ConferenceParticipantsGrid";
import { FormHeader } from "../../components/FormHeader";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import { useConferenceId } from "../../hooks/UseConferenceId";

export const ParticipantsPage = () => {
  const navigate = useNavigate();
  const conferenceId = useConferenceId();

  return (
    <Container>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButton onClick={() => navigate(`/conferences/${conferenceId}`)}>
          <ArrowBackIcon />
        </IconButton>
        <FormHeader> Participants </FormHeader>
      </Box>
      <ConferenceParticipantsGrid />
    </Container>
  );
};
