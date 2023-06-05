import { useParams } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { useGetSubmissionApi } from "./SubmissionDetails.hooks";

export const SubmissionDetails = () => {
  const { submissionId } = useParams();
  const submission = useGetSubmissionApi(Number(submissionId));

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableBody>
          <TableRow>
            <TableCell variant="head">Title</TableCell>
            <TableCell>{submission.data?.title}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">Author</TableCell>
            <TableCell>{submission.data?.authorName}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">Status</TableCell>
            <TableCell>{submission.data?.statusLabel}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">Abstract</TableCell>
            <TableCell
              style={{
                whiteSpace: "normal",
                wordBreak: "break-word",
              }}
            >
              {submission.data?.abstract}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">Keywords</TableCell>
            <TableCell>{submission.data?.keywords}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
