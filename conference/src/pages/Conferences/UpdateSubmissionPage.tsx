import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container } from "@mui/material";
import { CreateSubmissionForm } from "../../components/CreateSubmissionForm";
import { FormHeader } from "../../components/FormHeader";
import { useGetSubmissionApi } from "../../components/SubmissionDetails/SubmissionDetails.hooks";
import { Submission } from "../../types/Conference";

export const UpdateSubmissionPage = () => {
  const { submissionId } = useParams();
  const response = useGetSubmissionApi(Number(submissionId));
  const [submission, setSubmission] = useState<Submission | null>(null);

  useEffect(() => {
    if (!response.isLoading && !response.error && response.data) {
      setSubmission(response.data);
    }
  }, [response]);

  return (
    <Container>
      <FormHeader>Update submission</FormHeader>
      <CreateSubmissionForm submission={submission} />
    </Container>
  );
};
