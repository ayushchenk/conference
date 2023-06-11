import { Container } from "@mui/material";
import { ConferenceDetails } from "../../components/ConferenceDetails";
import { useParams } from "react-router-dom";
import { useGetConferenceApi } from "../../components/ConferenceDetails/ConferenceDetails.hooks";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { FormErrorAlert } from "../../components/FormErrorAlert";

export const ConferenceDetailsPage = () => {
  const { conferenceId } = useParams();
  const response = useGetConferenceApi(Number(conferenceId));

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
