import { Container } from "@mui/material";
import { useGetConferenceApi } from "../../components/ConferenceDetails/ConferenceDetails.hooks";
import { CreateConferenceForm } from "../../components/CreateConferenceForm";
import { FormNavHeader } from "../../components/FormHeader";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { FormErrorAlert2 } from "../../components/FormErrorAlert";
import { useConferenceId } from "../../hooks/UseConferenceId";

export const UpdateConferencePage = () => {
  const conferenceId = useConferenceId();
  const conference = useGetConferenceApi(conferenceId);

  if (conference.isLoading) {
    return <LoadingSpinner />;
  }

  if (conference.error) {
    return <FormErrorAlert2 error={conference.error} />;
  }

  return (
    <Container>
      <FormNavHeader route={`/conferences/${conferenceId}`}>Update conference</FormNavHeader>
      <CreateConferenceForm conference={conference.data} />
    </Container>
  );
};
