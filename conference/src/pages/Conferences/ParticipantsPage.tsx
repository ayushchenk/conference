import { Container } from "@mui/material";
import { ConferenceParticipantsGrid } from "../../components/ConferenceParticipantsGrid";
import { FormHeader } from "../../components/FormHeader";

export const ParticipantsPage = () => {
  return (
    <Container>
      <FormHeader>Participants</FormHeader>
      <ConferenceParticipantsGrid />
    </Container>
  );
};
