import { useCallback, useEffect, useState } from "react";
import { DataGrid, GridPaginationModel } from "@mui/x-data-grid";
import { useAddUserAdminRoleApi, useDeleteUserApi, useGetUsersApi, useRemoveUserAdminRoleApi, useUsersGridColumns } from "./UsersGrid.hooks";
import { defaultPage } from "../../util/Constants";
import { FormErrorAlert } from "../FormErrorAlert";
import { User } from "../../types/User";
import { NoRowsOverlay } from "../Util/NoRowsOverlay";
import { NoResultsOverlay } from "../Util/NoResultsOverlay";

export const UsersGrid = () => {
  const [currentPage, setCurrentPage] = useState<GridPaginationModel>(defaultPage);
  const users = useGetUsersApi(currentPage);
  const { response: deleteResponse, performDelete } = useDeleteUserApi();
  const { response: addRoleResponse, post: addRole } = useAddUserAdminRoleApi();
  const { response: removeRoleResponse, performDelete: removeRole } = useRemoveUserAdminRoleApi();
  const [rows, setRows] = useState<User[]>([]);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);

  const handleDelete = useCallback((user: User) => {
    setDeletingUser(user);
    performDelete({}, user.id);
  }, [performDelete]);

  const handleRoleChange = useCallback((user: User, checked: boolean) => {
    checked ? addRole({}, user.id) : removeRole({}, user.id);

    setRows(prevRows => {
      const newRows = [...prevRows];
      const updatedUser = newRows.find(r => r.id === user.id);
      if (updatedUser) {
        updatedUser.isAdmin = checked;
      }
      return newRows;
    });
  }, [addRole, removeRole]);

  const columns = useUsersGridColumns(handleDelete, handleRoleChange);

  useEffect(() => {
    if (deleteResponse.status === "success" && deletingUser) {
      setRows(prevRows => prevRows.filter((row) => row.id !== deletingUser.id));
    }
  }, [deleteResponse.status, deletingUser]);

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
        autoHeight
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel: currentPage } }}
        pageSizeOptions={[5, 10, 15, 25]}
        onPaginationModelChange={setCurrentPage}
        loading={users.status === "loading"}
        paginationMode="server"
        rowCount={users.data?.totalCount ?? 0}
        slots={{ 
          noRowsOverlay: NoRowsOverlay,
          noResultsOverlay: NoResultsOverlay
        }}
      />
      <FormErrorAlert response={users} />
      <FormErrorAlert response={deleteResponse} />
      <FormErrorAlert response={addRoleResponse} />
      <FormErrorAlert response={removeRoleResponse} />
    </>
  );
};
