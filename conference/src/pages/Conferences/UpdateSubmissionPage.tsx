import { useParams } from "react-router-dom";
import { Container } from "@mui/material";
import { CreateSubmissionForm } from "../../components/CreateSubmissionForm";
import { FormHeader } from "../../components/FormHeader";
import { useGetSubmissionApi } from "../../components/SubmissionDetails/SubmissionDetails.hooks";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { FormErrorAlert } from "../../components/FormErrorAlert";

export const UpdateSubmissionPage = () => {
  const { submissionId } = useParams();
  const response = useGetSubmissionApi(Number(submissionId));

  if (response.isLoading) {
    return <LoadingSpinner />;
  }

  if (response.isError) {
    return <FormErrorAlert response={response} />;
  }

  return (
    <Container>
      <FormHeader>Update submission</FormHeader>
      <CreateSubmissionForm submission={response.data!} />
    </Container>
  );
};
