import { Container } from "@mui/material";
import { SubmissionsGrid } from "../../components/SubmissionsGrid";
import { FormNavHeader } from "../../components/FormHeader";
import { useConferenceId } from "../../hooks/UseConferenceId";

export const SubmissionsPage = () => {
  const conferenceId = useConferenceId();

  return (
    <Container>
      <FormNavHeader route={`/conferences/${conferenceId}`}>Submissions</FormNavHeader>
      <SubmissionsGrid />
    </Container>
  );
};
