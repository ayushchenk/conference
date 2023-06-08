import { useState } from "react";
import { DataGrid, GridPaginationModel } from "@mui/x-data-grid";
import { User } from "../../types/User";
import { UserRoleManagementDialog } from "./UserRoleManagementDialog";
import { useGetUsersApi, useUsersGridProps } from "./UsersGrid.hooks";
import { defaultPage } from "../../util/Constants";

export const UsersGrid = () => {
  const [currentPage, setCurrentPage] = useState<GridPaginationModel>(defaultPage);
  const users = useGetUsersApi(currentPage);
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleOpenRoleDialog = (user: User) => {
    setSelectedUser(user);
    setIsRoleDialogOpen(true);
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
        onClose={() => setIsRoleDialogOpen(false)}
      />
    </>
  );
};
