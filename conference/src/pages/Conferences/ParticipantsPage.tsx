import { Container } from "@mui/material";
import { ConferenceParticipantsGrid } from "../../components/ConferenceParticipantsGrid";
import { FormNavHeader } from "../../components/FormHeader";
import { useConferenceId } from "../../hooks/UseConferenceId";

export const ParticipantsPage = () => {
  const conferenceId = useConferenceId();

  return (
    <Container maxWidth="xl">
      <FormNavHeader route={`/conferences/${conferenceId}`}>Participants</FormNavHeader>
      <ConferenceParticipantsGrid />
    </Container>
  );
};
