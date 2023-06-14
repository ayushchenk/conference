import { Container } from "@mui/material";
import { ConferenceDetails } from "../../components/ConferenceDetails";
import { useGetConferenceApi } from "../../components/ConferenceDetails/ConferenceDetails.hooks";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { FormErrorAlert } from "../../components/FormErrorAlert";
import { useConferenceId } from "../../hooks/UseConferenceId";

export const ConferenceDetailsPage = () => {
  const conferenceId = useConferenceId();
  const response = useGetConferenceApi(conferenceId);

  if (response.isLoading) {
    return <LoadingSpinner />;
  }

  if (response.isError) {
    return <FormErrorAlert response={response} />;
  }

  return (
    <Container>
      <ConferenceDetails conference={response.data!} />
    </Container>
  );
};
