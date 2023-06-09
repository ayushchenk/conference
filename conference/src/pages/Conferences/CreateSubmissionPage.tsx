import { Container } from "@mui/material";
import { CreateSubmissionForm } from "../../components/CreateSubmissionForm/CreateSubmissionForm";
import { FormHeader } from "../../components/FormHeader";

export const CreateSubmissionPage = () => {
  return (
    <Container>
      <FormHeader>Create submission</FormHeader>
      <CreateSubmissionForm />
    </Container>
  );
};
