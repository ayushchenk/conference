import { Container } from "@mui/material";
import { CreateSubmissionForm } from "../../components/CreateSubmissionForm/CreateSubmissionForm";

export const CreateSubmissionPage = () => {
  return (
    <Container>
      <h2>Create submission</h2>
      <CreateSubmissionForm />
    </Container>
  );
};
