import { Container } from "@mui/material";
import { SubmissionsGrid } from "../../components/SubmissionsGrid";
import { FormNavHeader } from "../../components/FormHeader";
import { useConferenceId } from "../../hooks/UseConferenceId";
import { Auth } from "../../util/Auth";

export const SubmissionsPage = () => {
  const conferenceId = useConferenceId();

  return (
    <Container maxWidth={Auth.isChair(conferenceId) ? "xl" : "lg"}>
      <FormNavHeader route={`/conferences/${conferenceId}`}>Submissions</FormNavHeader>
      <SubmissionsGrid />
    </Container>
  );
};
