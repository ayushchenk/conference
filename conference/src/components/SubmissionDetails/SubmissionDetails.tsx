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
import { usePostReturnSubmissionAPI } from "./SubmissionDetails.hooks";
import { SubmissionPapersTable } from "./SubmissionPapersTable";
import { TabPanel } from "./TabPanel";
import { Submission } from "../../types/Conference";
import { FormHeader } from "../FormHeader";

export const SubmissionDetails = ({ submission }: { submission: Submission }) => {
  const { conferenceId, submissionId } = useParams();
  const [tabValue, setTabValue] = useState(0);
  const { post: returnSubmission } = usePostReturnSubmissionAPI(Number(submissionId));

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleReturnSubmission = () => {
    returnSubmission({});
  };

  return (
    <>
      <FormHeader>{submission.title}</FormHeader>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableBody>
            <TableRow>
              <TableCell variant="head">Author</TableCell>
              <TableCell>{submission.authorName}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">Status</TableCell>
              <TableCell>{submission.statusLabel}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">Abstract</TableCell>
              <TableCell
                style={{
                  whiteSpace: "pre-line",
                  wordBreak: "break-word",
                }}
              >
                {submission.abstract}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">Keywords</TableCell>
              <TableCell>{submission.keywords}</TableCell>
            </TableRow>
            {submission.isAuthor && (
              <TableRow>
                <TableCell align="center" colSpan={12} variant="head">
                  <Button color="inherit" disabled={!submission.isValidForUpdate}>
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
            {submission.isReviewer &&
              <TableRow>
                <TableCell align="center" colSpan={12} variant="head">
                  <Button color="inherit" onClick={handleReturnSubmission} disabled={!submission.isValidForReturn}>
                    Return
                  </Button>
                </TableCell>
              </TableRow>
            }
          </TableBody>
        </Table>
      </TableContainer >
      {
        (submission.isReviewer || submission.isAuthor) &&
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
      }
    </>
  );
};
