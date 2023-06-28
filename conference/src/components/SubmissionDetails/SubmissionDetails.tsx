import { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tabs,
} from "@mui/material";
import { useConferenceId } from "../../hooks/UseConferenceId";
import { Auth } from "../../logic/Auth";
import { Submission } from "../../types/Conference";
import { FormErrorAlert } from "../FormErrorAlert";
import { FormHeader } from "../FormHeader";
import { CreateReviewDialog } from "./CreateReviewDialog";
import { ReviewsList } from "./ReviewsList";
import { usePostReturnSubmissionAPI } from "./SubmissionDetails.hooks";
import { SubmissionPapersTable } from "./SubmissionPapersTable";
import { TabPanel } from "./TabPanel";

export const SubmissionDetails = ({ submission }: { submission: Submission }) => {
  const navigate = useNavigate();
  const conferenceId = useConferenceId();
  const [tabValue, setTabValue] = useState(0);
  const { post: returnSubmission, response: returnResponse } = usePostReturnSubmissionAPI(submission.id);
  const isAuthor = submission.authorId === Auth.getId();

  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const handleReviewDialogOpen = () => setReviewDialogOpen(true);
  const handleReviewDialogClose = () => setReviewDialogOpen(false);

  const handleTabChange = useCallback((_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  }, []);

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButton onClick={() => navigate(`/conferences/${conferenceId}/submissions`)}>
          <ArrowBackIcon />
        </IconButton>
        <FormHeader>{submission.title}</FormHeader>
      </Box>
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
            {isAuthor && (
              <TableRow>
                <TableCell align="center" colSpan={12} variant="head">
                  <Button color="inherit" disabled={!submission.isValidForUpdate}>
                    <Link
                      className="header__link"
                      to={`/conferences/${conferenceId}/submissions/${submission.id}/edit`}
                    >
                      Edit
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            )}
            {submission.isReviewer && (
              <>
                <TableRow>
                  <TableCell align="center" colSpan={12} variant="head">
                    <Button onClick={handleReviewDialogOpen}>Write a Review</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center" colSpan={12} variant="head">
                    <Button
                      color="inherit"
                      onClick={() => returnSubmission({})}
                      disabled={!submission.isValidForReturn}
                    >
                      Return
                    </Button>
                  </TableCell>
                </TableRow>
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {(submission.isReviewer || isAuthor || Auth.isChair(conferenceId)) && (
        <Box mt={5}>
          <Tabs variant="fullWidth" value={tabValue} onChange={handleTabChange}>
            <Tab label="Papers" />
            <Tab label="Reviews" />
            <Tab label="Comments" disabled />
          </Tabs>
          <TabPanel value={tabValue} index={0}>
            <SubmissionPapersTable />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <ReviewsList />
          </TabPanel>
          <TabPanel value={tabValue} index={2}></TabPanel>
        </Box>
      )}
      <CreateReviewDialog open={reviewDialogOpen} onClose={handleReviewDialogClose} />
      <FormErrorAlert response={returnResponse} />
    </>
  );
};
