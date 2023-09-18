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
import { useDownloadPaperApi, useGetSubmissionPapersApi } from "./SubmissionDetails.hooks";
import moment from "moment";
import _ from "lodash";
import { FormErrorAlert } from "../FormErrorAlert";
import { SubmissionContext } from "../../contexts/SubmissionContext";
import { useCallback, useContext, useEffect, useState } from "react";
import { saveAs } from 'file-saver';
import { headers } from "../../util/Constants";
import { decode } from 'js-base64';
import { Alert, LinearProgress, Snackbar } from "@mui/material";

export const SubmissionPapersTable = () => {
  const context = useContext(SubmissionContext);
  const papers = useGetSubmissionPapersApi(context.submissionId);
  const downloadApi = useDownloadPaperApi();
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleSnackClose = useCallback(() => {
    setShowSnackbar(false);
  }, [setShowSnackbar]);

  useEffect(() => {
    if (downloadApi.response.status === "success") {
      const fileNameHeader = downloadApi.response.headers[headers.filename];
      saveAs(downloadApi.response.data, decode(fileNameHeader));
      downloadApi.reset();
    }
  }, [downloadApi]);

  if (papers.status === "loading") {
    return <LinearProgress />;
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
    <>
      <FormErrorAlert response={downloadApi.response} />
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
                    download={paper.fileName}
                    underline="none"
                    sx={{cursor: "pointer"}}
                    onClick={() => {
                      setShowSnackbar(true);
                      downloadApi.post({}, paper.id)
                    }}
                  >
                    <Stack direction="row" alignItems="center">
                      <Link component="p" variant="body2">{paper.fileName}</Link>
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
      <Snackbar open={showSnackbar} autoHideDuration={6000} onClose={handleSnackClose}>
        <Alert onClose={handleSnackClose} severity="success" sx={{ width: '100%' }}>
          Download will start soon
        </Alert>
      </Snackbar>
    </>
  );
};
