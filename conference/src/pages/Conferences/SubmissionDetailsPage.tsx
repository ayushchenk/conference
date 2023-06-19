import { Container } from "@mui/material";
import { SubmissionDetails } from "../../components/SubmissionDetails";
import { useGetSubmissionApi } from "../../components/SubmissionDetails/SubmissionDetails.hooks";
import { useParams } from "react-router-dom";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { FormErrorAlert } from "../../components/FormErrorAlert";

export const SubmissionDetailsPage = () => {
  const { submissionId } = useParams();
  const response = useGetSubmissionApi(Number(submissionId));

  if (response.status === "loading") {
    return <LoadingSpinner />;
  }

  if (response.status === "error") {
    return <FormErrorAlert response={response} />;
  }

  return (
    <Container>
      <SubmissionDetails submission={response.data} />
    </Container>
  );
};
