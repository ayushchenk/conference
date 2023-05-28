import { Container } from "@mui/material";
import { UsersGrid } from "../../components/UsersGrid";

export const UsersPage = () => {
  return (
    <Container>
      <h2>Users</h2>
      <UsersGrid />
    </Container>
  );
};
