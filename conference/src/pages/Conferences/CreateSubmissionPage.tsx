import { Container } from "@mui/material";
import { CreateSubmissionForm } from "../../components/CreateSubmissionForm/CreateSubmissionForm";
import { FormNavHeader } from "../../components/FormHeader";
import { useConferenceId } from "../../hooks/UseConferenceId";

export const CreateSubmissionPage = () => {
  const conferenceId = useConferenceId();

  return (
    <Container>
      <FormNavHeader route={`/conferences/${conferenceId}`}>Create submission</FormNavHeader>
      <CreateSubmissionForm />
    </Container>
  );
};
