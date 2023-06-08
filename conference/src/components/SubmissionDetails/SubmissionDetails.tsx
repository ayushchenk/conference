import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Tab from "@mui/material/Tab";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Tabs from "@mui/material/Tabs";
import { Auth } from "../../logic/Auth";
import { editableSubmissionStatuses, returnableSubmissionStatuses } from "../../util/Constants";
import { AuthorVisibility } from "../ProtectedRoute/AuthorVisibility";
import { ReviewerVisibility } from "../ProtectedRoute/ReviewerVisibility";
import { useGetSubmissionApi, usePostReturnSubmissionAPI } from "./SubmissionDetails.hooks";
import { SubmissionPapersTable } from "./SubmissionPapersTable";
import { TabPanel } from "./TabPanel";

export const SubmissionDetails = () => {
  const { conferenceId, submissionId } = useParams();
  const submission = useGetSubmissionApi(Number(submissionId));
  const [tabValue, setTabValue] = useState(0);
  const { post: returnSubmission } = usePostReturnSubmissionAPI(Number(submissionId));

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleReturnSubmission = () => {
    returnSubmission({});
  };

  function isSubmissionAuthor(): boolean {
    return submission?.data! && submission.data.authorId === Auth.getuserId();
  }

  function isSubmissionEditable(): boolean {
    return submission?.data! && editableSubmissionStatuses.includes(submission.data.status);
  }

  function isSubmissionReturnable(): boolean {
    return submission?.data! && returnableSubmissionStatuses.includes(submission.data.status);
  }
  return (
    <>
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
            <AuthorVisibility>
              {isSubmissionAuthor() && (
                <TableRow>
                  <TableCell align="center" colSpan={12} variant="head">
                    <Button color="inherit" disabled={!isSubmissionEditable()}>
                      <Link
                        className="header__link"
                        to={`/conferences/${conferenceId}/submissions/${submissionId}/edit`}
                      >
                        Edit
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              )}
            </AuthorVisibility>
            <ReviewerVisibility>
              <TableRow>
                <TableCell align="center" colSpan={12} variant="head">
                  <Button color="inherit" onClick={handleReturnSubmission} disabled={!isSubmissionReturnable()}>
                    Return
                  </Button>
                </TableCell>
              </TableRow>
            </ReviewerVisibility>
          </TableBody>
        </Table>
      </TableContainer>
      <Box mt={5}>
        <Tabs variant="fullWidth" value={tabValue} onChange={handleTabChange}>
          <Tab label="Papers" />
          <Tab label="Reviews" disabled />
          <Tab label="Comments" disabled />
        </Tabs>
        <TabPanel value={tabValue} index={0}>
          <SubmissionPapersTable />
        </TabPanel>
        <TabPanel value={tabValue} index={1}></TabPanel>
        <TabPanel value={tabValue} index={2}></TabPanel>
      </Box>
    </>
  );
};
