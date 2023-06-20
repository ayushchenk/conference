import { DataGrid, GridPaginationModel } from "@mui/x-data-grid";
import { useConferencesGridColumns, useDeleteConferenceApi, useGetConferencesApi } from "./ConferencesGrid.hooks";
import { useCallback, useEffect, useState } from "react";
import { defaultPage } from "../../util/Constants";
import { Conference } from "../../types/Conference";
import { FormErrorAlert } from "../FormErrorAlert";
import { NoRowsOverlay } from "../Util/NoRowsOverlay";

export const ConferencesGrid = () => {
  const [currentPage, setCurrentPage] = useState<GridPaginationModel>(defaultPage);
  const conferences = useGetConferencesApi(currentPage);
  const { response: deleteResponse, performDelete: deleteConference } = useDeleteConferenceApi();
  const [rows, setRows] = useState<Conference[]>([]);
  const [deletedConferenceId, setDeletedConferenceId] = useState<number | null>(null);

  const handleDelete = useCallback((conferenceId: number) => {
    setDeletedConferenceId(conferenceId);
    deleteConference({}, conferenceId);
  }, [deleteConference]);

  const columns = useConferencesGridColumns(handleDelete);

  useEffect(() => {
    if (conferences.status === "success") {
      setRows(conferences.data.items);
    }
  }, [conferences]);

  useEffect(() => {
    if (deleteResponse.status === "success" && deletedConferenceId) {
      setRows((prevRows) => prevRows.filter((row) => row.id !== deletedConferenceId));
      setDeletedConferenceId(null);
    }
  }, [deleteResponse.status, deletedConferenceId]);

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
      <FormErrorAlert response={conferences} />
      <FormErrorAlert response={deleteResponse} />
    </>
  );
};
