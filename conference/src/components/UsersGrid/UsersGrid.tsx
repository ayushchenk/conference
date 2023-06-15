import { useCallback, useEffect, useState } from "react";
import { DataGrid, GridPaginationModel } from "@mui/x-data-grid";
import { useDeleteUserApi, useGetUsersApi, useUsersGridColumns } from "./UsersGrid.hooks";
import { defaultPage } from "../../util/Constants";
import { FormErrorAlert } from "../FormErrorAlert";
import { User } from "../../types/User";

export const UsersGrid = () => {
  console.log('render');

  const [currentPage, setCurrentPage] = useState<GridPaginationModel>(defaultPage);
  const users = useGetUsersApi(currentPage);
  const [rows, setRows] = useState<User[]>([]);
  const [deletedUserId, setDeletedUserId] = useState<number | null>(null);
  const { response: deleteResponse, performDelete: deleteUser } = useDeleteUserApi();

  const handleDelete = useCallback((userId: number) => {
    setDeletedUserId(userId);
    deleteUser({}, userId);
  }, [deleteUser]);

  const columns = useUsersGridColumns(handleDelete);

  useEffect(() => {
    if (deleteResponse.status === "success" && deletedUserId) {
      setRows((prevRows) => prevRows.filter((row) => row.id !== deletedUserId));
    }
  }, [deleteResponse.status, deletedUserId]);

  useEffect(() => {
    if (users.status === "success") {
      setRows(users.data.items);
    }
  }, [users]);

  if (users.status === "error") {
    return <FormErrorAlert response={users} />;
  }

  return (
    <>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel: currentPage } }}
        pageSizeOptions={[5, 10, 15, 25]}
        onPaginationModelChange={setCurrentPage}
        loading={users.status === "loading"}
      />
      <FormErrorAlert response={deleteResponse} />
    </>
  );
};
