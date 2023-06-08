import { Container } from "@mui/material";
import { UsersGrid } from "../../components/UsersGrid";
import { FormHeader } from "../../components/FormHeader";

export const UsersPage = () => {
  return (
    <Container>
      <FormHeader>Users</FormHeader>
      <UsersGrid />
    </Container>
  );
};
