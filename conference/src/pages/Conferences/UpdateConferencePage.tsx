import { Container } from "@mui/material";
import { useGetConferenceApi } from "../../components/ConferenceDetails/ConferenceDetails.hooks";
import { CreateConferenceForm } from "../../components/CreateConferenceForm";
import { FormNavHeader } from "../../components/FormHeader";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { FormErrorAlert } from "../../components/FormErrorAlert";
import { useConferenceId } from "../../hooks/UseConferenceId";

export const UpdateConferencePage = () => {
  const conferenceId = useConferenceId();
  const response = useGetConferenceApi(conferenceId);

  if (response.status === "loading") {
    return <LoadingSpinner />;
  }

  if (response.status === "error") {
    return <FormErrorAlert response={response} />;
  }

  return (
    <Container>
      <FormNavHeader route={`/conferences/${conferenceId}`}>Update conference</FormNavHeader>
      <CreateConferenceForm conference={response.data} />
    </Container>
  );
};
