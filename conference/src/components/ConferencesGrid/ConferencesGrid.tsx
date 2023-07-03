import { DataGrid, GridPaginationModel } from "@mui/x-data-grid";
import { useConferencesGridColumns, useDeleteConferenceApi, useGetConferencesApi } from "./ConferencesGrid.hooks";
import { useCallback, useEffect, useState } from "react";
import { defaultPage } from "../../util/Constants";
import { Conference } from "../../types/Conference";
import { FormErrorAlert } from "../FormErrorAlert";
import { NoRowsOverlay } from "../Util/NoRowsOverlay";
import { ConfirmationDialog } from "../ConfirmationDialog";

export const ConferencesGrid = () => {
  const [rows, setRows] = useState<Conference[]>([]);
  const [currentPage, setCurrentPage] = useState<GridPaginationModel>(defaultPage);
  const [deletingConference, setDeletingConference] = useState<Conference | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const conferences = useGetConferencesApi(currentPage);
  const { response: deleteResponse, performDelete: deleteConference } = useDeleteConferenceApi();

  const handleDelete = useCallback((conference: Conference) => {
    setDeletingConference(conference);
    setOpenDeleteDialog(true);
  }, [deleteConference]);

  const columns = useConferencesGridColumns(handleDelete);

  useEffect(() => {
    if (conferences.status === "success") {
      setRows(conferences.data.items);
    }
  }, [conferences]);

  useEffect(() => {
    if (deleteResponse.status === "success" && deletingConference) {
      setOpenDeleteDialog(false);
      setRows((prevRows) => prevRows.filter((row) => row.id !== deletingConference.id));
      setDeletingConference(null);
    }
  }, [deleteResponse.status, deletingConference]);

  return (
    <>
      <DataGrid
        autoHeight
        rows={rows}
        columns={columns}
        paginationModel={currentPage}
        pageSizeOptions={[5, 10, 15, 25]}
        onPaginationModelChange={setCurrentPage}
        loading={conferences.status === "loading"}
        paginationMode="server"
        rowCount={conferences.data?.totalCount ?? 0}
        slots={{
          noRowsOverlay: () => <NoRowsOverlay>
            You don't participate in any conference<br />
            Either join using code or contact organizer
          </NoRowsOverlay>,
          noResultsOverlay: () => <NoRowsOverlay>No results found</NoRowsOverlay>
        }}
      />
      <ConfirmationDialog
        open={openDeleteDialog}
        onCancel={() => setOpenDeleteDialog(false)}
        onConfirm={() => deleteConference({}, deletingConference?.id!)}
      >
        {`Are you sure you want to delete ${deletingConference?.acronym}?`}<br />
        This will also delete all submissions, reviews, comments, etc.
        <FormErrorAlert response={deleteResponse} />
      </ConfirmationDialog>
      <FormErrorAlert response={conferences} />
    </>
  );
};
