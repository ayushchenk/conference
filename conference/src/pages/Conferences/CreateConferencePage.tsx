import { Container } from "@mui/material";
import { CreateConferenceForm } from "../../components/CreateConferenceForm";
import { FormHeader } from "../../components/FormHeader";

export const CreateConferencePage = () => {
  return (
    <Container>
      <FormHeader>Create conference</FormHeader>
      <CreateConferenceForm />
    </Container>
  );
};
