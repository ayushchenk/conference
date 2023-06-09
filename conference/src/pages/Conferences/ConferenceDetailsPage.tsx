import { Container } from "@mui/material";
import { ConferenceDetails } from "../../components/ConferenceDetails";
import { FormHeader } from "../../components/FormHeader";

export const ConferenceDetailsPage = () => {
  return (
    <Container>
      <FormHeader>Conference details</FormHeader>
      <ConferenceDetails />
    </Container>
  );
};
