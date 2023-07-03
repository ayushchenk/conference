import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
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
import { TabPanel } from "./TabPanel";
import { FormHeader } from "../FormHeader";
import { useConferenceId } from "../../hooks/UseConferenceId";
import { Auth } from "../../logic/Auth";
import { Submission } from "../../types/Conference";
import { FormErrorAlert } from "../FormErrorAlert";
import { AnyRoleVisibility } from "../ProtectedRoute/AnyRoleVisibility";
import { SubmissionReviewersGrid } from "../SubmissionReviewersGrid/";
import { CreateReviewDialog } from "./CreateReviewDialog";
import { PreferenceCheckbox } from "./PreferenceCheckbox";
import { ReviewsList } from "./ReviewsList";
import { SubmissionPapersTable } from "./SubmissionPapersTable";
import { CommentSection } from "../CommentSection";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import UTurnLeftIcon from '@mui/icons-material/UTurnLeft';
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';

export const SubmissionDetails = ({ submission }: { submission: Submission }) => {
  const navigate = useNavigate();
  const conferenceId = useConferenceId();
  const [tabValue, setTabValue] = useState(0);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);

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
            {Auth.isReviewer(conferenceId) && !submission.isReviewer && !isAuthor && (
              <TableRow>
                <TableCell align="center" colSpan={12} variant="head">
                  <PreferenceCheckbox submissionId={submission.id} />
                </TableCell>
              </TableRow>
            )}
            {submission.isReviewer && <>
              {
                submission.isValidForReview &&
                <TableRow>
                  <TableCell align="center" colSpan={12} variant="head">
                    <Button onClick={() => setReviewDialogOpen(true)} startIcon={<RateReviewOutlinedIcon />}>Write a Review</Button>
                  </TableCell>
                </TableRow>
              }
              {submission.isValidForReturn &&
                <TableRow>
                  <TableCell align="center" colSpan={12} variant="head">
                    <Button onClick={() => returnSubmission({})} startIcon={<UTurnLeftIcon />}>Return</Button>
                  </TableCell>
                </TableRow>
              }
            </>
            }
            {!submission.isClosed && isChair &&
              <TableRow>
                <TableCell align="center">
                  <Button color="success" onClick={() => acceptSubmission({})} startIcon={<CheckIcon />}>
                    Accept
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button color="error" onClick={() => rejectSubmission({})} startIcon={<CloseIcon />}>
                    Reject
                  </Button>
                </TableCell>
              </TableRow>
            }
          </TableBody>
        </Table>
      </TableContainer>
      <FormErrorAlert response={returnResponse} />
      <FormErrorAlert response={acceptResponse} />
      <FormErrorAlert response={rejectResponse} />
      {(submission.isReviewer || isAuthor || isChair) &&
        <Box mt={5}>
          <Tabs variant="fullWidth" value={tabValue} onChange={handleTabChange}>
            <Tab label="Papers" />
            <Tab label="Reviews" />
            <Tab label="Comments" />
            {isChair && <Tab label="Reviewers" />}
          </Tabs>
          <TabPanel value={tabValue} index={0}>
            <SubmissionPapersTable />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <ReviewsList />
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            <CommentSection submissionId={submission.id} />
          </TabPanel>
          <TabPanel value={tabValue} index={3}>
            <SubmissionReviewersGrid submissionId={submission.id} />
          </TabPanel>
        </Box>
      }
      <CreateReviewDialog open={reviewDialogOpen} onClose={() => setReviewDialogOpen(false)} />
    </>
  );
};
