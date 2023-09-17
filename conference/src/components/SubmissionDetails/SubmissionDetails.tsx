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
import {
  useAcceptSubmissionApi,
  useAcceptSuggestionsSubmissionApi,
  usePostReturnSubmissionApi,
  useRejectSubmissionApi
} from "./SubmissionDetails.hooks";
import { FormHeader } from "../FormHeader";
import { useConferenceId } from "../../hooks/UseConferenceId";
import { Auth } from "../../util/Auth";
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
import TabContext from "@mui/lab/TabContext";
import { TabPanel } from "./TabPanel";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { UploadPresentationDialog } from "../UploadPresentationDialog/UploadPresentationDialog";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { submissionStatusColor } from "../../util/Functions";

export const SubmissionDetails = ({ submission }: { submission: Submission }) => {
  const navigate = useNavigate();
  const conferenceId = useConferenceId();
  const [tabValue, setTabValue] = useState("0");
  const [presentationDialogOpen, setPresentationDialogOpen] = useState(false);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [acceptDialogOpen, setAcceptDialogOpen] = useState(false);
  const [acceptSuggestionsDialogOpen, setAcceptSuggestionsDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [returnDialogOpen, setReturnDialogOpen] = useState(false);

  const { post: returnSubmission, response: returnResponse } = usePostReturnSubmissionApi(submission.id);
  const { post: acceptSubmission, response: acceptResponse } = useAcceptSubmissionApi(submission.id);
  const { post: rejectSubmission, response: rejectResponse } = useRejectSubmissionApi(submission.id);
  const { post: acceptSuggestionsSubmission, response: acceptSuggestionsResponse } = useAcceptSuggestionsSubmissionApi(submission.id);

  const isAuthor = submission.authorId === Auth.getId();
  const isChair = Auth.isChair(conferenceId);

  const handleTabChange = useCallback((_: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  }, []);

  useEffect(() => {
    if (returnResponse.status === "success") {
      window.location.reload();
    }
  }, [returnResponse]);

  useEffect(() => {
    if (acceptResponse.status === "success") {
      window.location.reload();
    }
  }, [acceptResponse]);

  useEffect(() => {
    if (acceptSuggestionsResponse.status === "success") {
      window.location.reload();
    }
  }, [acceptSuggestionsResponse]);

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
          {isAuthor &&
            <>
              {submission.status !== 6 && //rejected
                <Button sx={{ mr: 3 }} onClick={() => setPresentationDialogOpen(true)} startIcon={<UploadFileIcon />}>
                  Upload presentation
                </Button>
              }
            </>
          }
          {isChair &&
            <>
              <Button sx={{ mr: 3 }} color="success" onClick={() => setAcceptDialogOpen(true)} startIcon={<CheckIcon />}>
                Accept
              </Button>
              {submission.status !== 4 && //accepted with suggestions
                <Button sx={{ mr: 3, color: "#edba11" }} onClick={() => setAcceptSuggestionsDialogOpen(true)} startIcon={<QuestionMarkIcon />}>
                  Accept with suggestions
                </Button>
              }
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
              <TableCell variant="head" sx={{ color: submissionStatusColor(submission.status) }}>{submission.statusLabel}</TableCell>
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
        <Box mt={5}>
          <TabContext value={tabValue.toString()}>
            <Tabs variant="fullWidth" value={tabValue} onChange={handleTabChange}>
              <Tab label="Papers" value="0" />
              <Tab label="Reviews" value="1" />
              <Tab label="Comments" value="2" />
              {isChair && <Tab label="Reviewers" value="3" />}
            </Tabs>
            <TabPanel value="0">
              <SubmissionPapersTable />
            </TabPanel>
            <TabPanel value="1">
              {!submission.isClosed && submission.isReviewer && submission.isValidForReview && (
                <Box sx={{ display: "flex", justifyContent: "center" }} my={1}>
                  <Button
                    sx={{ mr: 3 }}
                    onClick={() => setReviewDialogOpen(true)}
                    startIcon={<RateReviewOutlinedIcon />}
                  >
                    Write a Review
                  </Button>
                </Box>
              )}
              <ReviewsList />
            </TabPanel>
            <TabPanel value="2">
              <CommentSection />
            </TabPanel>
            <TabPanel value="3">
              <SubmissionReviewersGrid />
            </TabPanel>
          </TabContext>
        </Box>
      }
      <CreateReviewDialog
        open={reviewDialogOpen}
        onClose={() => setReviewDialogOpen(false)}
        onSuccess={() => window.location.reload()}
      />
      <UploadPresentationDialog open={presentationDialogOpen} onClose={() => setPresentationDialogOpen(false)} />
      <ConfirmationDialog
        open={acceptDialogOpen}
        onConfirm={() => acceptSubmission({})}
        onCancel={() => setAcceptDialogOpen(false)}>
        Are you sure you want to accept this submission?
        <FormErrorAlert response={acceptResponse} />
      </ConfirmationDialog>
      <ConfirmationDialog
        open={acceptSuggestionsDialogOpen}
        onConfirm={() => acceptSuggestionsSubmission({})}
        onCancel={() => setAcceptSuggestionsDialogOpen(false)}>
        Are you sure you want to accept the submission with suggested changes?
        Author will have to make changes and reviewers will review the submission again.
        <FormErrorAlert response={acceptSuggestionsResponse} />
      </ConfirmationDialog>
      <ConfirmationDialog
        open={rejectDialogOpen}
        onConfirm={() => rejectSubmission({})}
        onCancel={() => setRejectDialogOpen(false)}>
        Are you sure you want to reject this submission?
        <FormErrorAlert response={rejectResponse} />
      </ConfirmationDialog>
      <ConfirmationDialog
        open={returnDialogOpen}
        onConfirm={() => returnSubmission({})}
        onCancel={() => setReturnDialogOpen(false)}>
        Are you sure you want to return this submission? <br />
        Author will have to update the submission before you can submit a review.
        <FormErrorAlert response={returnResponse} />
      </ConfirmationDialog>
    </SubmissionContext.Provider>
  );
};
