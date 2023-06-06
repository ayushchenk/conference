import { useState } from "react";
import { useParams } from "react-router-dom";
import { DataGrid, GridPaginationModel } from "@mui/x-data-grid";
import { defaultPage } from "../../util/Constants";
import { useGetSubmissionsApi, useSubmissionsGridProps } from "./SubmissionsGrid.hooks";

export const SubmissionsGrid = () => {
  const [currentPage, setCurrentPage] = useState<GridPaginationModel>(defaultPage);
  const { conferenceId } = useParams();
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