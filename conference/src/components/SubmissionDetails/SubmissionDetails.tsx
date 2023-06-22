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
import { useAddSubmissionPreferenceApi, useGetHasPreferenceApi, usePostReturnSubmissionAPI, useRemoveSubmissionPreferenceApi } from "./SubmissionDetails.hooks";
import { SubmissionPapersTable } from "./SubmissionPapersTable";
import { TabPanel } from "./TabPanel";
import { Submission } from "../../types/Conference";
import { FormHeader } from "../FormHeader";
import { useConferenceId } from "../../hooks/UseConferenceId";
import { FormErrorAlert } from "../FormErrorAlert";
import { Auth } from "../../logic/Auth";
import { Checkbox, FormControlLabel, IconButton } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { SubmissionReviewersGrid } from "../SubmissionReviewersGrid/";
import EditIcon from '@mui/icons-material/Edit';

export const SubmissionDetails = ({ submission }: { submission: Submission }) => {
  const navigate = useNavigate();
  const conferenceId = useConferenceId();
  const [tabValue, setTabValue] = useState(0);
  const [preference, setPreference] = useState(false);

  const { post: returnSubmission, response: returnResponse } = usePostReturnSubmissionAPI(submission.id);
  const addPreferenceApi = useAddSubmissionPreferenceApi(submission.id);
  const removePreferenceApi = useRemoveSubmissionPreferenceApi(submission.id);
  const hasPreference = useGetHasPreferenceApi(submission.id);

  const isAuthor = submission.authorId === Auth.getId();
  const isChair = Auth.isChair(conferenceId);

  const handleTabChange = useCallback((_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  }, []);

  useEffect(() => {
    if (hasPreference.status === "success") {
      setPreference(hasPreference.data.result);
    }
  }, [hasPreference]);

  const handlePreferenceChange = useCallback((checked: boolean) => {
    setPreference(checked);
    if (checked) {
      addPreferenceApi.post({});
    }
    else {
      removePreferenceApi.performDelete({});
    }
  }, [addPreferenceApi, removePreferenceApi]);

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButton onClick={() => navigate(`/conferences/${conferenceId}/submissions`)}>
          <ArrowBackIcon />
        </IconButton>
        <FormHeader>{submission.title}</FormHeader>
        {isAuthor &&
          <IconButton onClick={() => navigate(`/conferences/${conferenceId}/submissions/${submission.id}/edit`)}>
            <EditIcon />
          </IconButton>
        }
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
            {Auth.isReviewer(conferenceId) && !submission.isReviewer && hasPreference.status === "success" &&
              <TableRow>
                <TableCell align="center" colSpan={12} variant="head">
                  <FormControlLabel label={"I want to review this submission"} control={
                    <Checkbox
                      checked={preference}
                      value={preference}
                      onChange={(e) => handlePreferenceChange(e.target.checked)} />
                  } />
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
          </TableBody>
        </Table>
      </TableContainer >
      {
        (submission.isReviewer || isAuthor || isChair) &&
        <Box mt={5}>
          <Tabs variant="fullWidth" value={tabValue} onChange={handleTabChange}>
            <Tab label="Papers" />
            {
              isChair && <Tab label="Reviewers" />
            }
            <Tab label="Reviews" disabled />
            <Tab label="Comments" disabled />
          </Tabs>
          <TabPanel value={tabValue} index={0}>
            <SubmissionPapersTable />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <SubmissionReviewersGrid submissionId={submission.id} />
          </TabPanel>
          <TabPanel value={tabValue} index={2}></TabPanel>
          <TabPanel value={tabValue} index={3}></TabPanel>
        </Box>
      }
      <FormErrorAlert response={returnResponse} />
      <FormErrorAlert response={hasPreference} />
      <FormErrorAlert response={addPreferenceApi.response} />
      <FormErrorAlert response={removePreferenceApi.response} />
    </>
  );
};
