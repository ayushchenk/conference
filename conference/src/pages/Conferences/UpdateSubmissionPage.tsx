import { Container } from "@mui/material";
import { CreateSubmissionForm } from "../../components/CreateSubmissionForm";
import { FormNavHeader } from "../../components/FormHeader";
import { useGetSubmissionApi } from "../../components/SubmissionDetails/SubmissionDetails.hooks";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { FormSwrErrorAlert } from "../../components/FormErrorAlert";
import { useConferenceId } from "../../hooks/UseConferenceId";
import { useSubmissionId } from "../../hooks/UseSubmissionId";

export const UpdateSubmissionPage = () => {
  const conferenceId = useConferenceId();
  const submissionId = useSubmissionId();
  const submission = useGetSubmissionApi(submissionId);

  if (submission.isLoading) {
    return <LoadingSpinner />;
  }

  if (submission.error) {
    return <FormSwrErrorAlert response={submission} />;
  }

  return (
    <Container>
      <FormNavHeader route={`/conferences/${conferenceId}/submissions/${submissionId}`}>Update submission</FormNavHeader>
      <CreateSubmissionForm submission={submission.data} />
    </Container>
  );
};
