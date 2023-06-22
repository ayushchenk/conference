import { AssignReviewerDialogProps } from "./AssignReviewerDialog.types";
import { useAddSubmissionReviewerApi, useConferenceReviewersGridColumns, useGetConferenceReviewersApi } from "./AssignReviewerDialog.hooks";
import { DataGrid } from "@mui/x-data-grid";
import { FormErrorAlert } from "../FormErrorAlert";
import { NoResultsOverlay } from "../Util/NoResultsOverlay";
import { NoRowsOverlay } from "../Util/NoRowsOverlay";
import { useCallback, useEffect, useState } from "react";
import { User } from "../../types/User";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

export const AssignReviewerDialog = ({
  show,
  submissionId,
  onReviewerAdd,
  onDialogClose
}: AssignReviewerDialogProps) => {
  const [addingReviewer, setAddingReviewer] = useState<User | null>();

  const reviewers = useGetConferenceReviewersApi();
  const addReviewerApi = useAddSubmissionReviewerApi(submissionId);

  const handleReviewerClick = useCallback((user: User) => {
    setAddingReviewer(user);
    addReviewerApi.post({}, user.id);
  }, [addReviewerApi]);

  useEffect(() => {
    if (addingReviewer && addReviewerApi.response.status === "success") {
      onReviewerAdd(addingReviewer);
      setAddingReviewer(null);
    }
  }, [addingReviewer, addReviewerApi.response, onReviewerAdd]);

  const columns = useConferenceReviewersGridColumns(handleReviewerClick);

  return (
    <Dialog maxWidth="xl" open={show} onClose={onDialogClose}>
      <DialogTitle>Assign reviewers</DialogTitle>
      <DialogContent>
        <DataGrid
          autoHeight
          rows={reviewers.data ?? []}
          columns={columns}
          loading={reviewers.status === "loading"}
          pageSizeOptions={[10]}
          slots={{
            noRowsOverlay: () => <NoRowsOverlay>No reviewers in the conference</NoRowsOverlay>,
            noResultsOverlay: NoResultsOverlay
          }}
        />
        <FormErrorAlert response={reviewers} />
        <FormErrorAlert response={addReviewerApi.response} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onDialogClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}