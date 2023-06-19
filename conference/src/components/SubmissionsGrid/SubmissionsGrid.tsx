import { useState } from "react";
import { DataGrid, GridPaginationModel } from "@mui/x-data-grid";
import { defaultPage } from "../../util/Constants";
import { useGetSubmissionsApi, useSubmissionsGridColumns } from "./SubmissionsGrid.hooks";
import { useConferenceId } from "../../hooks/UseConferenceId";
import { FormErrorAlert } from "../FormErrorAlert";

export const SubmissionsGrid = () => {
  const conferenceId = useConferenceId();
  const [currentPage, setCurrentPage] = useState<GridPaginationModel>(defaultPage);
  const submissions = useGetSubmissionsApi(currentPage, conferenceId);
  const columns = useSubmissionsGridColumns();

  return (
    <>
      <DataGrid
        rows={submissions.data?.items ?? []}
        columns={columns}
        initialState={{ pagination: { paginationModel: currentPage } }}
        pageSizeOptions={[5, 10, 15, 25]}
        onPaginationModelChange={setCurrentPage}
        loading={submissions.status === "loading"}
        paginationMode="server"
        rowCount={submissions.data?.totalCount ?? 0}
      />
      <FormErrorAlert response={submissions} />
    </>
  );
};
