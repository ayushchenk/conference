import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { useAcceptSubmissionApi, usePostReturnSubmissionApi, useRejectSubmissionApi } from "./SubmissionDetails.hooks";
import { SubmissionPapersTable } from "./SubmissionPapersTable";
import { TabPanel } from "./TabPanel";
import { Submission } from "../../types/Conference";
import { FormHeader } from "../FormHeader";
import { useConferenceId } from "../../hooks/UseConferenceId";
import { FormErrorAlert } from "../FormErrorAlert";
import { Auth } from "../../logic/Auth";
import { IconButton } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import moment from "moment";
import { AnyRoleVisibility } from "../ProtectedRoute/AnyRoleVisibility";
import { SubmissionReviewersGrid } from "../SubmissionReviewersGrid/";
import EditIcon from '@mui/icons-material/Edit';
import { PreferenceCheckbox } from "./PreferenceCheckbox";
import { CommentSection } from "../CommentSection";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

export const SubmissionDetails = ({ submission }: { submission: Submission }) => {
  const navigate = useNavigate();
  const conferenceId = useConferenceId();
  const [tabValue, setTabValue] = useState(0);

  const { post: returnSubmission, response: returnResponse } = usePostReturnSubmissionApi(submission.id);
  const { post: acceptSubmission, response: acceptResponse } = useAcceptSubmissionApi(submission.id);
  const { post: rejectSubmission, response: rejectResponse } = useRejectSubmissionApi(submission.id);

  const isAuthor = submission.authorId === Auth.getId();
  const isChair = Auth.isChair(conferenceId);

  const handleTabChange = useCallback((_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  }, []);

  useEffect(() => {
    if (acceptResponse.status === "success") {
      window.location.reload();
    }
  }, [acceptResponse]);

  useEffect(() => {
    if (rejectResponse.status === "success") {
      window.location.reload();
    }
  }, [rejectResponse]);

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButton onClick={() => navigate(`/conferences/${conferenceId}/submissions`)}>
          <ArrowBackIcon />
        </IconButton>
        <FormHeader>{submission.title}</FormHeader>
        {isAuthor && submission.isValidForUpdate &&
          <IconButton onClick={() => navigate(`/conferences/${conferenceId}/submissions/${submission.id}/edit`)}>
            <EditIcon />
          </IconButton>
        }
      </Box>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableBody>
            <AnyRoleVisibility roles={["Chair", "Author"]}>
              <TableRow>
                <TableCell variant="head">Author</TableCell>
                <TableCell>{submission.authorName}</TableCell>
              </TableRow>
            </AnyRoleVisibility>
            <TableRow>
              <TableCell variant="head">Keywords</TableCell>
              <TableCell>{submission.keywords}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">Research Areas</TableCell>
              <TableCell>
                {submission.researchAreas.map((area, index) => (
                  <div key={index}>{area}</div>
                ))}
              </TableCell>
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
              <TableCell variant="head">Status</TableCell>
              <TableCell>{submission.statusLabel}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">Created On</TableCell>
              <TableCell>{moment(new Date(submission.createdOn)).local().format("DD/MM/YYYY HH:mm:ss")}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">Updated On</TableCell>
              <TableCell>{moment(new Date(submission.modifiedOn)).local().format("DD/MM/YYYY HH:mm:ss")}</TableCell>
            </TableRow>
            {Auth.isReviewer(conferenceId) && !submission.isReviewer && !isAuthor &&
              <TableRow>
                <TableCell align="center" colSpan={12} variant="head">
                  <PreferenceCheckbox submissionId={submission.id} />
                </TableCell>
              </TableRow>
            }
            {submission.isReviewer &&
              <TableRow>
                <TableCell align="center" colSpan={12} variant="head">
                  <Button color="inherit" onClick={() => returnSubmission({})} disabled={!submission.isValidForReturn}>
                    Return
                  </Button>
                </TableCell>
              </TableRow>
            }
            {!submission.isClosed && isChair &&
              <TableRow>
                <TableCell align="center">
                  <Button color="success" variant="outlined" onClick={() => acceptSubmission({})} startIcon={<CheckIcon />}>
                    Accept
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button color="error" variant="outlined" onClick={() => rejectSubmission({})} startIcon={<CloseIcon />}>
                    Reject
                  </Button>
                </TableCell>
              </TableRow>
            }
          </TableBody>
        </Table>
      </TableContainer >
      <FormErrorAlert response={returnResponse} />
      <FormErrorAlert response={acceptResponse} />
      <FormErrorAlert response={rejectResponse} />
      {
        (submission.isReviewer || isAuthor || isChair) &&
        <Box mt={5}>
          <Tabs variant="fullWidth" value={tabValue} onChange={handleTabChange}>
            <Tab label="Papers" />
            <Tab label="Reviews" disabled />
            <Tab label="Comments" />
            {isChair &&
              <Tab label="Reviewers" />
            }
          </Tabs>
          <TabPanel value={tabValue} index={0}>
            <SubmissionPapersTable />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            <CommentSection submissionId={submission.id}></CommentSection>
          </TabPanel>
          <TabPanel value={tabValue} index={3}>
            <SubmissionReviewersGrid submissionId={submission.id} />
          </TabPanel>
        </Box>
      }
    </>
  );
};
