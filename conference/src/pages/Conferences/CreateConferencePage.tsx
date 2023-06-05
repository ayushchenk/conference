import { Container } from "@mui/material";
import { CreateConferenceForm } from "../../components/CreateConferenceForm";

export const CreateConferencePage = () => {
  return (
    <Container>
      <h2>Create conference</h2>
      <CreateConferenceForm />
    </Container>
  );
};
