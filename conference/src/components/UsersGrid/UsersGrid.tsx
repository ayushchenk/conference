import { useState } from "react";
import { DataGrid, GridPaginationModel } from "@mui/x-data-grid";
import { User } from "../../types/User";
import { UserRoleManagementDialog } from "./UserRoleManagementDialog";
import { useAddUserRoleApi, useGetUsersApi, useRemoveUserRoleApi, useUsersGridProps } from "./UsersGrid.hooks";

export const UsersGrid = () => {
  const [currentPage, setCurrentPage] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });

  const users = useGetUsersApi(currentPage);
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { post: addRole } = useAddUserRoleApi();
  const { performDelete: removeRole } = useRemoveUserRoleApi();

  const handleOpenRoleDialog = (user: any) => {
    setSelectedUser(user);
    setIsRoleDialogOpen(true);
  };

  const handleCloseRoleDialog = () => {
    setIsRoleDialogOpen(false);
  };

  const handleAddRole = (userId: number, role: string) => {
    addRole({ role: role }, userId);
  };
  const handleRemoveRole = (userId: number, role: string) => {
    removeRole({ role: role }, userId);
  };

  const [rows, columns] = useUsersGridProps(users, handleOpenRoleDialog);

  return (
    <>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel: currentPage } }}
        pageSizeOptions={[5, 10, 15, 25]}
        onPaginationModelChange={setCurrentPage}
        loading={users.isLoading}
      />
      <UserRoleManagementDialog
        open={isRoleDialogOpen}
        user={selectedUser}
        onClose={handleCloseRoleDialog}
        onAddRole={handleAddRole}
        onRemoveRole={handleRemoveRole}
      />
    </>
  );
};
