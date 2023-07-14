import { Container } from "@mui/material";
import { SubmissionDetails } from "../../components/SubmissionDetails";
import { useGetSubmissionApi } from "../../components/SubmissionDetails/SubmissionDetails.hooks";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { FormSwrErrorAlert } from "../../components/FormErrorAlert";
import { useSubmissionId } from "../../hooks/UseSubmissionId";

export const SubmissionDetailsPage = () => {
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
      <SubmissionDetails submission={submission.data!} />
    </Container>
  );
};
