import { useParams } from "react-router-dom";
import { Container } from "@mui/material";
import { useGetConferenceApi } from "../../components/ConferenceDetails/ConferenceDetails.hooks";
import { CreateConferenceForm } from "../../components/CreateConferenceForm";
import { FormHeader } from "../../components/FormHeader";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { FormErrorAlert } from "../../components/FormErrorAlert";
import { useConferenceIdParam } from "../../hooks/UseConferenceIdParam";

export const UpdateConferencePage = () => {
  const conferenceId = useConferenceIdParam();
  const response = useGetConferenceApi(Number(conferenceId));

  if (response.isLoading) {
    return <LoadingSpinner />;
  }

  if (response.isError) {
    return <FormErrorAlert response={response} />;
  }

  return (
    <Container>
      <FormHeader>Update conference</FormHeader>
      <CreateConferenceForm conference={response.data!} />
    </Container>
  );
};
