import { Container } from "@mui/material";
import { SubmissionsGrid } from "../../components/SubmissionsGrid";
import { FormHeader } from "../../components/FormHeader";

export const SubmissionsPage = () => {
  return (
    <Container>
      <FormHeader>Submissions</FormHeader>
      <SubmissionsGrid />
    </Container>
  );
};
