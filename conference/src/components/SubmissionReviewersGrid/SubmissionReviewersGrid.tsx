import { DataGrid } from "@mui/x-data-grid";
import { FormErrorAlert } from "../FormErrorAlert";
import { NoResultsOverlay } from "../Util/NoResultsOverlay";
import { NoRowsOverlay } from "../Util/NoRowsOverlay";
import {
  useAddSubmissionReviewerApi,
  useGetConferenceReviewersApi,
  useGetSubmissionReviewersApi,
  useRemoveSubmissionReviewerApi,
  useSubmissionReviewersGridColumns
} from "./SubmissionReviewersGrid.hooks";
import { useCallback, useEffect, useState, useContext } from "react";
import { User } from "../../types/User";
import { Button } from "@mui/material";
import { AssignReviewerDialog } from "../AssignReviewerDialog";
import AddIcon from '@mui/icons-material/Add';
import { SubmissionContext } from "../../contexts/SubmissionContext";
import { ConfirmationDialog } from "../ConfirmationDialog";

export const SubmissionReviewersGrid = () => {
  const { submissionId, isClosed } = useContext(SubmissionContext);
  const [assignedReviewers, setAssignedReviewers] = useState<User[]>([]);
  const [unassignedReviewers, setUnassignedReviewers] = useState<User[]>([]);
  const [addingReviewer, setAddingReviewer] = useState<User | null>(null);
  const [removingReviewer, setRemovingReviewer] = useState<User | null>(null);
  const [openAssignDialog, setOpenAssignDialog] = useState(false);
  const [openRemoveDialog, setOpenRemoveDialog] = useState(false);

  const conferenceReviewers = useGetConferenceReviewersApi(submissionId);
  const submissionReviewers = useGetSubmissionReviewersApi(submissionId);
  const addReviewerApi = useAddSubmissionReviewerApi(submissionId);
  const removeReviewerApi = useRemoveSubmissionReviewerApi(submissionId);

  const handleReviewerRemove = useCallback((user: User) => {
    setRemovingReviewer(user);
    setOpenRemoveDialog(true);
  }, []);

  const handleReviewerAdd = useCallback((user: User) => {
    setAddingReviewer(user);
    addReviewerApi.post({}, user.id);
  }, [addReviewerApi]);

  useEffect(() => {
    if (submissionReviewers.status === "success" && conferenceReviewers.status === "success") {
      setAssignedReviewers(submissionReviewers.data);
      setUnassignedReviewers(conferenceReviewers.data);
    }
  }, [submissionReviewers, conferenceReviewers]);

  useEffect(() => {
    if (removeReviewerApi.response.status === "success" && removingReviewer) {
      setAssignedReviewers(prevRows => [...prevRows].filter(r => r.id !== removingReviewer.id));
      setUnassignedReviewers(prevRows => [...prevRows, removingReviewer]);
      setOpenRemoveDialog(false);
      setRemovingReviewer(null);
      removeReviewerApi.reset();
    }
  }, [removeReviewerApi, removingReviewer]);

  useEffect(() => {
    if (addReviewerApi.response.status === "success" && addingReviewer) {
      setAssignedReviewers(prevRows => [...prevRows, addingReviewer]);
      setUnassignedReviewers(prevRows => [...prevRows].filter(r => r.id !== addingReviewer.id));
      setAddingReviewer(null);
      addReviewerApi.reset();
    }
  }, [addReviewerApi, addingReviewer]);

  const columns = useSubmissionReviewersGridColumns(handleReviewerRemove);

  return (
    <>
      <Button
        onClick={() => setOpenAssignDialog(true)}
        disabled={conferenceReviewers.status === "loading" || isClosed}
        startIcon={<AddIcon />}>
        Add Reviewer
      </Button>
      <DataGrid
        autoHeight
        hideFooter
        rows={assignedReviewers}
        columns={columns}
        loading={submissionReviewers.status === "loading"}
        slots={{
          noRowsOverlay: () => <NoRowsOverlay>No reviewers assigned yet</NoRowsOverlay>,
          noResultsOverlay: NoResultsOverlay
        }}
      />
      <AssignReviewerDialog
        show={openAssignDialog}
        reviewers={unassignedReviewers}
        onDialogClose={() => setOpenAssignDialog(false)}
        onReviewerAdd={handleReviewerAdd}
      />
      <ConfirmationDialog
        open={openRemoveDialog}
        onConfirm={() => removeReviewerApi.performDelete({}, removingReviewer?.id!)}
        onCancel={() => setOpenRemoveDialog(false)}
      >
        {`Are you sure you want to remove ${removingReviewer?.fullName} from this submission?`}
      </ConfirmationDialog>
      <FormErrorAlert response={submissionReviewers} />
      <FormErrorAlert response={conferenceReviewers} />
      <FormErrorAlert response={removeReviewerApi.response} />
      <FormErrorAlert response={addReviewerApi.response} />
    </>
  );
}