import { Container } from "@mui/material";
import { SubmissionDetails } from "../../components/SubmissionDetails";
import { useGetSubmissionApi } from "../../components/SubmissionDetails/SubmissionDetails.hooks";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { FormErrorAlert2 } from "../../components/FormErrorAlert";
import { useSubmissionId } from "../../hooks/UseSubmissionId";

export const SubmissionDetailsPage = () => {
  const submissionId = useSubmissionId();
  const submission = useGetSubmissionApi(submissionId);

  if (submission.isLoading) {
    return <LoadingSpinner />;
  }

  if (submission.error) {
    return <FormErrorAlert2 error={submission.error} />;
  }

  return (
    <Container>
      <SubmissionDetails submission={submission.data!} />
    </Container>
  );
};
