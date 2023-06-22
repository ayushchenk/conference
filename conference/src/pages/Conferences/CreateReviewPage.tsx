import { Container } from "@mui/material";
import { CreateReviewForm } from "../../components/CreateReviewForm/CreateReviewForm";
import { FormHeader } from "../../components/FormHeader";

export const CreateReviewPage = () => {
  return (
    <Container>
      <FormHeader>Create review</FormHeader>
      <CreateReviewForm />
    </Container>
  );
};
