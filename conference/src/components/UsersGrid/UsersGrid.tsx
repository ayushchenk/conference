import { useCallback, useEffect, useState } from "react";
import { DataGrid, GridPaginationModel } from "@mui/x-data-grid";
import { useDeleteUserApi, useGetUsersApi, useUsersGridColumns } from "./UsersGrid.hooks";
import { defaultPage } from "../../util/Constants";
import { FormErrorAlert } from "../FormErrorAlert";
import { User } from "../../types/User";
import { UserRoleManagementDialog } from "./UserRoleManagementDialog";

export const UsersGrid = () => {
  const [currentPage, setCurrentPage] = useState<GridPaginationModel>(defaultPage);
  const users = useGetUsersApi(currentPage);
  const { response: deleteResponse, performDelete: deleteUser } = useDeleteUserApi();
  const [rows, setRows] = useState<User[]>([]);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);
  const [changingRoleUser, setChangingRoleUser] = useState<User | null>(null);
  const [roleDialogOpen, setRoleDialogOpen] = useState(false);

  const handleDelete = useCallback((user: User) => {
    setDeletingUser(user);
    deleteUser({}, user.id);
  }, [deleteUser]);

  const handleRoleDialogOpen = useCallback((user: User) => {
    setChangingRoleUser(user);
    setRoleDialogOpen(true);
  }, []);

  const handleRoleDialogClose = useCallback(() => {
    setChangingRoleUser(null);
    setRoleDialogOpen(false);
  }, []);

  const columns = useUsersGridColumns(handleDelete, handleRoleDialogOpen);

  useEffect(() => {
    if (deleteResponse.status === "success" && deletingUser) {
      setRows((prevRows) => prevRows.filter((row) => row.id !== deletingUser.id));
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
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel: currentPage } }}
        pageSizeOptions={[5, 10, 15, 25]}
        onPaginationModelChange={setCurrentPage}
        loading={users.status === "loading"}
        paginationMode="server"
        rowCount={users.data?.totalCount ?? 0}
      />
      <UserRoleManagementDialog
        user={changingRoleUser}
        open={roleDialogOpen}
        onClose={handleRoleDialogClose}
        admin
      />
      <FormErrorAlert response={users} />
      <FormErrorAlert response={deleteResponse} />
    </>
  );
};
