import { useState } from "react";
import { DataGrid, GridPaginationModel } from "@mui/x-data-grid";
import { defaultPage } from "../../util/Constants";
import { useGetSubmissionsApi, useSubmissionsGridProps } from "./SubmissionsGrid.hooks";
import { useConferenceId } from "../../hooks/UseConferenceId";

export const SubmissionsGrid = () => {
  const [currentPage, setCurrentPage] = useState<GridPaginationModel>(defaultPage);
  const conferenceId = useConferenceId();
  const submissions = useGetSubmissionsApi(currentPage, Number(conferenceId));
  const [rows, columns] = useSubmissionsGridProps(submissions);

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      initialState={{ pagination: { paginationModel: currentPage } }}
      pageSizeOptions={[5, 10, 15, 25]}
      onPaginationModelChange={setCurrentPage}
      loading={submissions.isLoading}
    />
  );
};
