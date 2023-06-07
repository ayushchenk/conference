import { Container } from "@mui/material";
import { ConferencesGrid } from "../../components/ConferencesGrid";
import { FormHeader } from "../../components/FormHeader";

export const ConferencesPage = () => {
  return (
    <Container>
      <FormHeader>Available conferences</FormHeader>
      <ConferencesGrid />
    </Container>
  );
}