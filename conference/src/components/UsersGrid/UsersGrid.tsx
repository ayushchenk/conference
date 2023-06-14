import { useState } from "react";
import { DataGrid, GridPaginationModel } from "@mui/x-data-grid";
import { useGetUsersApi, useUsersGridProps } from "./UsersGrid.hooks";
import { defaultPage } from "../../util/Constants";

export const UsersGrid = () => {
  const [currentPage, setCurrentPage] = useState<GridPaginationModel>(defaultPage);
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
