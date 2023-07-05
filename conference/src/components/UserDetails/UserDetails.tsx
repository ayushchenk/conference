import { TableContainer, Paper, Table, TableBody, TableRow, TableCell, Container } from "@mui/material";
import { UserDetailsProps } from "./UserDetails.types";
import { FormNavHeader } from "../FormHeader";

export const UserDetails = ({ user }: UserDetailsProps) => {
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
     <FormNavHeader route="/users">{user.fullName}</FormNavHeader>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableBody>
            {tableRow("Email", user.email)}
            {tableRow("Country", user.country)}
            {tableRow("Affiliation", user.affiliation)}
            {tableRow("Webpage", user.webpage, true)}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
} 