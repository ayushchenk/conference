import { Container } from "@mui/material";
import { ParticipantsGrid } from "../../components/ParticipantsGrid";

export const ParticipantsPage = () => {
  return (
    <Container>
      <h2>Participants</h2>
      <ParticipantsGrid />
    </Container>
  );
};
