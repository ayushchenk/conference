import { useParams } from "react-router-dom";
import { Container } from "@mui/material";
import { CreateSubmissionForm } from "../../components/CreateSubmissionForm";
import { FormHeader, FormNavHeader } from "../../components/FormHeader";
import { useGetSubmissionApi } from "../../components/SubmissionDetails/SubmissionDetails.hooks";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { FormErrorAlert } from "../../components/FormErrorAlert";

export const UpdateSubmissionPage = () => {
  const { conferenceId, submissionId } = useParams();
  const response = useGetSubmissionApi(Number(submissionId));

  if (response.status === "loading" || response.status === "not-initiated") {
    return <LoadingSpinner />;
  }

  if (response.status === "error") {
    return <FormErrorAlert response={response} />;
  }

  return (
    <Container>
      <FormNavHeader route={`/conferences/${conferenceId}/submissions/${submissionId}`}>Update submission</FormNavHeader>
      <CreateSubmissionForm submission={response.data} />
    </Container>
  );
};
