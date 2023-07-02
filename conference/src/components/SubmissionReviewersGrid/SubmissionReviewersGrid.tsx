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
import { SubmissionReviewersGridProps } from "./SubmissionReviewersGrid.types";
import { useCallback, useEffect, useState } from "react";
import { User } from "../../types/User";
import { Button } from "@mui/material";
import { AssignReviewerDialog } from "../AssignReviewerDialog";

export const SubmissionReviewersGrid = ({ submissionId }: SubmissionReviewersGridProps) => {
  const [assignedReviewers, setAssignedReviewers] = useState<User[]>([]);
  const [unassignedReviewers, setUnassignedReviewers] = useState<User[]>([]);
  const [addingReviewer, setAddingReviewer] = useState<User | null>(null);
  const [removingReviewer, setRemovingReviewer] = useState<User | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const conferenceReviewers = useGetConferenceReviewersApi(submissionId);
  const submissionReviewers = useGetSubmissionReviewersApi(submissionId);
  const addReviewerApi = useAddSubmissionReviewerApi(submissionId);
  const removeReviewerApi = useRemoveSubmissionReviewerApi(submissionId);

  const handleReviewerRemove = useCallback((user: User) => {
    setRemovingReviewer(user);
    removeReviewerApi.performDelete({}, user.id);
  }, [removeReviewerApi]);

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
    }
  }, [removeReviewerApi.response, removingReviewer]);

  useEffect(() => {
    if (addReviewerApi.response.status === "success" && addingReviewer) {
      setAssignedReviewers(prevRows => [...prevRows, addingReviewer]);
      setUnassignedReviewers(prevRows => [...prevRows].filter(r => r.id !== addingReviewer.id));
    }
  }, [addReviewerApi.response, addingReviewer]);

  const columns = useSubmissionReviewersGridColumns(handleReviewerRemove);

  return (
    <>
      <Button
        onClick={() => setOpenDialog(true)}
        disabled={conferenceReviewers.status === "loading"}>
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
        show={openDialog}
        reviewers={unassignedReviewers}
        onDialogClose={() => setOpenDialog(false)}
        onReviewerAdd={handleReviewerAdd}
      />
      <FormErrorAlert response={submissionReviewers} />
      <FormErrorAlert response={conferenceReviewers} />
      <FormErrorAlert response={removeReviewerApi.response} />
      <FormErrorAlert response={addReviewerApi.response} />
    </>
  );
}