import { Container } from "@mui/material";
import { ConferenceDetails } from "../../components/ConferenceDetails";
import { useGetConferenceApi } from "../../components/ConferenceDetails/ConferenceDetails.hooks";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { FormSwrErrorAlert } from "../../components/FormErrorAlert";
import { useConferenceId } from "../../hooks/UseConferenceId";

export const ConferenceDetailsPage = () => {
  const conferenceId = useConferenceId();
  const conference = useGetConferenceApi(conferenceId);

  if (conference.isLoading) {
    return <LoadingSpinner />;
  }

  if (conference.error) {
    return <FormSwrErrorAlert response={conference} />;
  }

  return (
    <Container>
      <ConferenceDetails conference={conference.data!} />
    </Container>
  );
};
