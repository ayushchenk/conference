import { Container } from "@mui/material";
import { CreateConferenceForm } from "../../components/CreateConferenceForm";
import { FormNavHeader } from "../../components/FormHeader";

export const CreateConferencePage = () => {
  return (
    <Container>
      <FormNavHeader route="/">Create conference</FormNavHeader>
      <CreateConferenceForm />
    </Container>
  );
};
