import { DataGrid } from "@mui/x-data-grid";
import { FormErrorAlert } from "../FormErrorAlert";
import { NoResultsOverlay } from "../Util/NoResultsOverlay";
import { NoRowsOverlay } from "../Util/NoRowsOverlay";
import { useGetSubmissionReviewersApi, useRemoveSubmissionReviewerApi, useSubmissionReviewersGridColumns } from "./SubmissionReviewersGrid.hooks";
import { SubmissionReviewersGridProps } from "./SubmissionReviewersGrid.types";
import { useCallback, useEffect, useState } from "react";
import { User } from "../../types/User";
import { Button } from "@mui/material";
import { AssignReviewerDialog } from "../AssignReviewerDialog";

export const SubmissionReviewersGrid = ({ submissionId }: SubmissionReviewersGridProps) => {
  const [rows, setRows] = useState<User[]>([]);
  const [removingReviewer, setRemovingReviewer] = useState<User | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const reviewers = useGetSubmissionReviewersApi(submissionId);
  const removeReviewerApi = useRemoveSubmissionReviewerApi(submissionId);

  const handleReviewerRemove = useCallback((user: User) => {
    setRemovingReviewer(user);
    removeReviewerApi.performDelete({}, user.id);
  }, [removeReviewerApi]);

  const handleReviewerAdd = useCallback((user: User) => {
    setRows(prevRows => {
      const newRows = [...prevRows];
      if(!newRows.find(u => u.id === user.id)){
        newRows.push(user);
      }
      return newRows;
    });
  }, []);

  useEffect(() => {
    if (reviewers.status === "success") {
      setRows(reviewers.data);
    }
  }, [reviewers]);

  useEffect(() => {
    if (removeReviewerApi.response.status === "success" && removingReviewer) {
      setRows(prevRows => [...prevRows].filter(r => r.id !== removingReviewer.id));
    }
  }, [removeReviewerApi.response, removingReviewer]);

  const columns = useSubmissionReviewersGridColumns(handleReviewerRemove);

  return (
    <>
      <Button onClick={() => setOpenDialog(true)}>Add Reviewer</Button>
      <DataGrid
        autoHeight
        hideFooter
        rows={rows}
        columns={columns}
        loading={reviewers.status === "loading"}
        slots={{
          noRowsOverlay: () => <NoRowsOverlay>No reviewers assigned yet</NoRowsOverlay>,
          noResultsOverlay: NoResultsOverlay
        }}
      />
      <AssignReviewerDialog
        show={openDialog}
        onDialogClose={() => setOpenDialog(false)}
        submissionId={submissionId}
        onReviewerAdd={handleReviewerAdd}
      />
      <FormErrorAlert response={reviewers} />
      <FormErrorAlert response={removeReviewerApi.response} />
    </>
  );
}