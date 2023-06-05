import { DataGrid, GridPaginationModel } from "@mui/x-data-grid";
import { useConferencesGridProps, useGetConferencesApi } from "./ConferencesGrid.hooks";
import { useState } from "react";
import { defaultPage } from "../../util/Constants";

export const ConferencesGrid = () => {
  const [currentPage, setCurrentPage] = useState<GridPaginationModel>(defaultPage);
  const conferences = useGetConferencesApi(currentPage);
  const [rows, columns] = useConferencesGridProps(conferences);

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      initialState={{ pagination: { paginationModel: currentPage } }}
      pageSizeOptions={[5, 10, 15, 25]}
      onPaginationModelChange={setCurrentPage}
      loading={conferences.isLoading}
    />
  );
};
