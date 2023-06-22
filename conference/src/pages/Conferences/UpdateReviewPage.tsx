import { Container } from "@mui/material";
import { CreateReviewForm } from "../../components/CreateReviewForm";
import { FormHeader } from "../../components/FormHeader";
import { Review } from "../../types/Conference";

export const UpdateReviewPage = (review: Review) => {
  return (
    <Container>
      <FormHeader>Update review</FormHeader>
      <CreateReviewForm review={review} />
    </Container>
  );
};
