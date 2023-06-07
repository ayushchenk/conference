import { TableContainer, Paper, Table, TableBody, TableRow, TableCell, Container, IconButton } from "@mui/material";
import { UserDetailsProps } from "./UserDetails.types";
import { FormHeader } from "../FormHeader";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { useState } from "react";
import { UserRoleManagementDialog } from "../UsersGrid";

export const UserDetails = ({ user }: UserDetailsProps) => {
  const [modalOpen, setModalOpen] = useState(false);

  const tableRow = (label: string, value: string, link: boolean = false) => {
    return (
      <TableRow>
        <TableCell variant="head">{label}</TableCell>
        <TableCell>{link ? <a href={value}>{value}</a> : <>{value}</>}</TableCell>
      </TableRow>
    );
  };

  return (
    <Container>
      <FormHeader>{user.fullName}</FormHeader>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableBody>
            {tableRow("Email", user.email)}
            {tableRow("Country", user.country)}
            {tableRow("Affiliation", user.affiliation)}
            {tableRow("Webpage", user.webpage, true)}
            <TableRow>
              <TableCell variant="head">Roles</TableCell>
              <TableCell>
                <label>{user.roles.join(", ")}</label>
                <IconButton onClick={() => setModalOpen(true)}>
                  <ManageAccountsIcon/>
                </IconButton>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <UserRoleManagementDialog
        open={modalOpen}
        user={user}
        onClose={() => setModalOpen(false)}
      />
    </Container>
  );
} 