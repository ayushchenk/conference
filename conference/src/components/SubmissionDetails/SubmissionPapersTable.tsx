import { useParams } from "react-router-dom";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { useGetSubmissionPapersApi } from "./SubmissionDetails.hooks";
import moment from "moment";
import _ from "lodash";
import { FormErrorAlert } from "../FormErrorAlert";
import { CircularProgress } from "@mui/material";

export const SubmissionPapersTable = () => {
  const { submissionId } = useParams();
  const papers = useGetSubmissionPapersApi(Number(submissionId));

  if (papers.status === "loading") {
    return <CircularProgress/>;
  }

  if (papers.status === "error") {
    return <FormErrorAlert response={papers} />;
  }

  const groupByType = _.groupBy(papers.data, "typeLabel");
  const latestDates = new Map<string, string>();

  for (const type of Object.keys(groupByType)) {
    latestDates.set(type, groupByType[type].find(p => p.createdOn)?.createdOn!);
  }

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>File</TableCell>
            <TableCell>Upload Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {papers?.data?.map((paper, index) => (
            <TableRow key={paper.id}>
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell component="th" scope="row">
                {`${paper.typeLabel} ${latestDates.get(paper.typeLabel) === paper.createdOn ? '(latest)' : ''}`}
              </TableCell>
              <TableCell>
                <Link
                  href={`data:application/pdf;base64,${paper.base64Content}`}
                  download={paper.fileName}
                  underline="none"
                >
                  <Stack direction="row" alignItems="center">
                    <Typography>{paper.fileName}</Typography>
                    <FileDownloadIcon fontSize="medium" />
                  </Stack>
                </Link>
              </TableCell>
              <TableCell>
                {moment(new Date(paper.createdOn)).local().format("DD/MM/YYYY HH:mm:ss")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
