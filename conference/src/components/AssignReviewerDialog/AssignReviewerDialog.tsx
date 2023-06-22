import { AssignReviewerDialogProps } from "./AssignReviewerDialog.types";
import { useConferenceReviewersGridColumns } from "./AssignReviewerDialog.hooks";
import { DataGrid } from "@mui/x-data-grid";
import { NoResultsOverlay } from "../Util/NoResultsOverlay";
import { NoRowsOverlay } from "../Util/NoRowsOverlay";
import { useCallback } from "react";
import { User } from "../../types/User";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

export const AssignReviewerDialog = ({
  show,
  reviewers,
  onReviewerAdd,
  onDialogClose
}: AssignReviewerDialogProps) => {

  const handleReviewerClick = useCallback((user: User) => {
    onReviewerAdd(user);
  }, [onReviewerAdd]);

  const columns = useConferenceReviewersGridColumns(handleReviewerClick);

  return (
    <Dialog maxWidth="xl" open={show} onClose={onDialogClose}>
      <DialogTitle>Assign reviewers</DialogTitle>
      <DialogContent>
        <DataGrid
          autoHeight
          rows={reviewers}
          columns={columns}
          pageSizeOptions={[100]}
          slots={{
            noRowsOverlay: () => <NoRowsOverlay>No reviewers available</NoRowsOverlay>,
            noResultsOverlay: NoResultsOverlay
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onDialogClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}