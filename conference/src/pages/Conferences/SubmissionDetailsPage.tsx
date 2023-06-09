import { Container } from "@mui/material";
import { SubmissionDetails } from "../../components/SubmissionDetails";
import { FormHeader } from "../../components/FormHeader";

export const SubmissionDetailsPage = () => {
  return (
    <Container>
      <FormHeader>Submission details</FormHeader>
      <SubmissionDetails />
    </Container>
  );
};
