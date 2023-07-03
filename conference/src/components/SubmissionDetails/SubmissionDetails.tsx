import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import { Divider, IconButton } from "@mui/material";
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
import { ConfirmationDialog } from "../ConfirmationDialog";
import { SubmissionContext } from "../../contexts/SubmissionContext";

export const SubmissionDetails = ({ submission }: { submission: Submission }) => {
  const navigate = useNavigate();
  const conferenceId = useConferenceId();
  const [tabValue, setTabValue] = useState(0);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [acceptDialogOpen, setAcceptDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [returnDialogOpen, setReturnDialogOpen] = useState(false);

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
    <SubmissionContext.Provider value={{
      submissionId: submission.id,
      isClosed: submission.isClosed
    }}>
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
      {!submission.isClosed &&
        <Box>
          <Divider />
          {isChair &&
            <>
              <Button sx={{ mr: 3 }} color="success" onClick={() => setAcceptDialogOpen(true)} startIcon={<CheckIcon />}>
                Accept
              </Button>
              <Button sx={{ mr: 3 }} color="error" onClick={() => setRejectDialogOpen(true)} startIcon={<CloseIcon />}>
                Reject
              </Button>
            </>
          }
          {submission.isReviewer &&
            <>
              {submission.isValidForReturn &&
                <Button sx={{ mr: 3 }} onClick={() => setReturnDialogOpen(true)} startIcon={<UTurnLeftIcon />}>
                  Return
                </Button>
              }
              {submission.isValidForReview &&
                <Button sx={{ mr: 3 }} onClick={() => setReviewDialogOpen(true)} startIcon={<RateReviewOutlinedIcon />}>
                  Write a Review
                </Button>
              }
            </>
          }
          <Divider />
        </Box>
      }
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
          </TableBody>
        </Table>
      </TableContainer>
      {(submission.isReviewer || isAuthor || isChair) &&
        <Box mt={1}>
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
      <ConfirmationDialog
        open={acceptDialogOpen}
        onConfirm={() => acceptSubmission({})}
        onCancel={() => setAcceptDialogOpen(false)}>
        Are you sure you want to accept the submission?
        <FormErrorAlert response={acceptResponse} />
      </ConfirmationDialog>
      <ConfirmationDialog
        open={rejectDialogOpen}
        onConfirm={() => rejectSubmission({})}
        onCancel={() => setRejectDialogOpen(false)}>
        Are you sure you want to reject the submission?
        <FormErrorAlert response={rejectResponse} />
      </ConfirmationDialog>
      <ConfirmationDialog
        open={returnDialogOpen}
        onConfirm={() => returnSubmission({})}
        onCancel={() => setReturnDialogOpen(false)}>
        Are you sure you want to return the submission? <br />
        Author will have to update the submission before you can submit a review.
        <FormErrorAlert response={returnResponse} />
      </ConfirmationDialog>
    </SubmissionContext.Provider>
  );
};
