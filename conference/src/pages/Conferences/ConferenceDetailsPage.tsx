import { Container } from "@mui/material";
import { ConferenceDetails } from "../../components/ConferenceDetails";
import { useGetConferenceApi } from "../../components/ConferenceDetails/ConferenceDetails.hooks";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { FormErrorAlert } from "../../components/FormErrorAlert";
import { useConferenceIdParam } from "../../hooks/UseConferenceIdParam";

export const ConferenceDetailsPage = () => {
  const conferenceId = useConferenceIdParam();
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
