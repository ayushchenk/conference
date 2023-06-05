import { DataGrid, GridPaginationModel } from "@mui/x-data-grid";
import { useUsersGridProps, useGetUsersApi } from "./UsersGrid.hooks";
import { useState } from "react";

export const UsersGrid = () => {
  const [currentPage, setCurrentPage] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });

  const users = useGetUsersApi(currentPage);
  const [rows, columns] = useUsersGridProps(users);

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      initialState={{ pagination: { paginationModel: currentPage } }}
      pageSizeOptions={[5, 10, 15, 25]}
      onPaginationModelChange={setCurrentPage}
      loading={users.isLoading}
    />
  );
};
