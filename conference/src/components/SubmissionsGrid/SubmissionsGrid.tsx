import { useState } from "react";
import { DataGrid, GridPaginationModel } from "@mui/x-data-grid";
import { defaultPage } from "../../util/Constants";
import { useGetSubmissionsApi, useSubmissionsGridColumns } from "./SubmissionsGrid.hooks";
import { useConferenceId } from "../../hooks/UseConferenceId";
import { FormErrorAlert } from "../FormErrorAlert";
import { NoRowsOverlay } from "../Util/NoRowsOverlay";
import { NoResultsOverlay } from "../Util/NoResultsOverlay";

export const SubmissionsGrid = () => {
  const conferenceId = useConferenceId();
  const [currentPage, setCurrentPage] = useState<GridPaginationModel>(defaultPage);
  const submissions = useGetSubmissionsApi(currentPage, conferenceId);
  const columns = useSubmissionsGridColumns();

  return (
    <>
      <DataGrid
        autoHeight
        rows={submissions.data?.items ?? []}
        columns={columns}
        initialState={{ pagination: { paginationModel: currentPage } }}
        pageSizeOptions={[5, 10, 15, 25]}
        onPaginationModelChange={setCurrentPage}
        paginationMode="server"
        loading={submissions.status === "loading"}
        rowCount={submissions.data?.totalCount ?? 0}
        slots={{
          noRowsOverlay: () => <NoRowsOverlay>No submissions uploaded yet</NoRowsOverlay>,
          noResultsOverlay: NoResultsOverlay
        }}
      />
      <FormErrorAlert response={submissions} />
    </>
  );
};
