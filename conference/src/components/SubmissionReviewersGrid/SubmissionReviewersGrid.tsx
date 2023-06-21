import { DataGrid } from "@mui/x-data-grid";
import { FormErrorAlert } from "../FormErrorAlert";
import { NoResultsOverlay } from "../Util/NoResultsOverlay";
import { NoRowsOverlay } from "../Util/NoRowsOverlay";
import { useGetSubmissionReviewersApi, useRemoveSubmissionReviewerApi, useSubmissionReviewersGridColumns } from "./SubmissionReviewersGrid.hooks";
import { SubmissionReviewersGridProps } from "./SubmissionReviewersGrid.types";
import { useCallback, useEffect, useState } from "react";
import { defaultPage } from "../../util/Constants";
import { User } from "../../types/User";

export const SubmissionReviewersGrid = ({ submissionId }: SubmissionReviewersGridProps) => {
  const [currentPage, setCurrentPage] = useState(defaultPage);
  const [rows, setRows] = useState<User[]>([]);
  const [removingReviewer, setRemovingReviewer] = useState<User | null>(null);

  const reviewers = useGetSubmissionReviewersApi(submissionId, currentPage);
  const removeReviewerApi = useRemoveSubmissionReviewerApi(submissionId);

  const handleReviewerRemove = useCallback((user: User) => {
    setRemovingReviewer(user);
    removeReviewerApi.performDelete({}, user.id);
  }, []);

  const columns = useSubmissionReviewersGridColumns(handleReviewerRemove);

  useEffect(() => {
    if (reviewers.status === "success") {
      setRows(reviewers.data.items);
    }
  }, [reviewers]);

  useEffect(() => {
    if (removeReviewerApi.response.status === "success" && removingReviewer) {
      setRows(prevRows => [...prevRows].filter(r => r.id !== removingReviewer.id));
    }
  }, [removeReviewerApi.response]);

  return (
    <>
      <DataGrid
        autoHeight
        rows={reviewers.data?.items ?? []}
        columns={columns}
        initialState={{ pagination: { paginationModel: currentPage } }}
        pageSizeOptions={[5, 10, 15, 25]}
        onPaginationModelChange={setCurrentPage}
        paginationMode="server"
        loading={reviewers.status === "loading"}
        rowCount={reviewers.data?.totalCount ?? 0}
        slots={{
          noRowsOverlay: () => <NoRowsOverlay>No reviewers assigned yet</NoRowsOverlay>,
          noResultsOverlay: NoResultsOverlay
        }}
      />
      <FormErrorAlert response={reviewers} />
      <FormErrorAlert response={removeReviewerApi.response} />
    </>
  );
}