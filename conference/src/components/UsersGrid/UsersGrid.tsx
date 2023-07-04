import { useCallback, useEffect, useRef, useState } from "react";
import { DataGrid, GridPaginationModel } from "@mui/x-data-grid";
import { useAddUserAdminRoleApi, useDeleteUserApi, useGetUsersApi, useRemoveUserAdminRoleApi, useUsersGridColumns } from "./UsersGrid.hooks";
import { defaultPage } from "../../util/Constants";
import { FormErrorAlert } from "../FormErrorAlert";
import { User } from "../../types/User";
import { NoRowsOverlay } from "../Util/NoRowsOverlay";
import { NoResultsOverlay } from "../Util/NoResultsOverlay";
import { ConfirmationDialog } from "../ConfirmationDialog";
import { TextField } from "@mui/material";

export const UsersGrid = () => {
  const [currentPage, setCurrentPage] = useState<GridPaginationModel>(defaultPage);
  const [rows, setRows] = useState<User[]>([]);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const users = useGetUsersApi(currentPage, debouncedQuery);
  const deleteUserApi = useDeleteUserApi();
  const { response: addRoleResponse, post: addRole } = useAddUserAdminRoleApi();
  const { response: removeRoleResponse, performDelete: removeRole } = useRemoveUserAdminRoleApi();

  const handleDelete = useCallback((user: User) => {
    setDeletingUser(user);
    setOpenDeleteDialog(true);
  }, []);

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
    if (deleteUserApi.response.status === "success" && deletingUser) {
      setRows(prevRows => prevRows.filter((row) => row.id !== deletingUser.id));
      setDeletingUser(null);
      deleteUserApi.reset();
      setOpenDeleteDialog(false);
    }
  }, [deleteUserApi, deletingUser]);

  useEffect(() => {
    if (users.status === "success") {
      setRows(users.data.items);
    }
  }, [users]);

  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setQuery(e.target.value);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      setDebouncedQuery(e.target.value);
      debounceTimeout.current = null;
    }, 350);
  }, []);

  if (users.status === "error") {
    return <FormErrorAlert response={users} />;
  }

  return (
    <>
      <TextField
        fullWidth
        margin="normal"
        id="query"
        name="query"
        label="Search query"
        placeholder="Search by name, email, country or affiliation"
        type="text"
        value={query}
        onChange={handleInput}
      />
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
      <ConfirmationDialog
        open={openDeleteDialog}
        onCancel={() => setOpenDeleteDialog(false)}
        onConfirm={() => deleteUserApi.performDelete({}, deletingUser?.id!)}
      >
        {`Are you sure you want to delete ${deletingUser?.fullName}'s account?`}<br />
        This will also delete all associated data.
      </ConfirmationDialog>
      <FormErrorAlert response={deleteUserApi.response} />
      <FormErrorAlert response={addRoleResponse} />
      <FormErrorAlert response={removeRoleResponse} />
    </>
  );
}; 
