import { Container } from "@mui/material";
import { ParticipantsGrid } from "../../components/ParticipantsGrid";
import { FormHeader } from "../../components/FormHeader";

export const ParticipantsPage = () => {
  return (
    <Container>
      <FormHeader>Participants</FormHeader>
      <ParticipantsGrid />
    </Container>
  );
};
