import { DataGrid, GridPaginationModel } from "@mui/x-data-grid";
import { useConferenceParticipantsGridColumns, useGetParticipantsApi, useAddParticipantApi, useDeleteParticipantApi } from "./ConferenceParticipantsGrid.hooks";
import { useCallback, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { ParticipantUsersGrid } from "../ParticipantUsersGrid";
import { defaultPage } from "../../util/Constants";
import { User } from "../../types/User";
import { useConferenceId } from "../../hooks/UseConferenceId";
import { UserRoleManagementDialog } from "../UsersGrid";
import { FormErrorAlert } from "../FormErrorAlert";

export const ConferenceParticipantsGrid = () => {
  const conferenceId = useConferenceId();
  const [currentPage, setCurrentPage] = useState<GridPaginationModel>(defaultPage);
  const participants = useGetParticipantsApi(currentPage, conferenceId);

  const { response: addResponse, post: addParticipant } = useAddParticipantApi(conferenceId);
  const { response: deleteResponse, performDelete: deleteParticipant } = useDeleteParticipantApi(conferenceId);

  const [openAddParticipantDialog, setOpenAddParticipantDialog] = useState(false);
  const [openRoleDialog, setOpenRoleDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [newParticipant, setNewParticipant] = useState<User | null>(null);
  const [deletingParticipant, setDeletingParticipant] = useState<User | null>(null);

  const handleOpenRoleDialog = useCallback((user: User) => {
    setSelectedUser(user);
    setOpenRoleDialog(true);
  }, []);

  const handleDelete = useCallback((user: User) => {
    setDeletingParticipant(user);
    deleteParticipant({}, user.id);
  }, [deleteParticipant]);

  const columns = useConferenceParticipantsGridColumns(conferenceId, handleDelete, handleOpenRoleDialog);
  const [rows, setRows] = useState<User[]>([]);

  const handleAddParticipant = useCallback((user: User) => {
    addParticipant({}, user.id);
    setNewParticipant(user);
  }, [addParticipant]);

  const handleRoleChange = useCallback((user: User, roles: string[]) => {
    setRows(prevRows => {
      const newRows = [...prevRows];
      const changedUser = newRows.find(r => r.id === user.id);
      if (changedUser) {
        changedUser.roles[conferenceId] = roles;
      }
      return newRows;
    });
  }, [setRows, conferenceId]);

  useEffect(() => {
    if (deleteResponse.status === "success" && deletingParticipant) {
      setDeletingParticipant(null);
      setRows(prevRows => prevRows.filter(row => row.id !== deletingParticipant.id));
    }
  }, [deleteResponse.status, deletingParticipant]);

  useEffect(() => {
    if (participants.status === "success") {
      setRows(participants.data.items);
    }
  }, [participants]);

  useEffect(() => {
    if (addResponse.status === "success" && newParticipant) {
      //skip new user if already in table
      setRows(prevRows => {
        return prevRows.find(row => row.id === newParticipant.id)
          ? prevRows
          : [...prevRows, newParticipant]
      });
    }
  }, [addResponse.status, newParticipant]);

  return (
    <>
      <Button onClick={() => setOpenAddParticipantDialog(true)}>Add Participant</Button>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel: currentPage } }}
        pageSizeOptions={[5, 10, 15, 25]}
        onPaginationModelChange={setCurrentPage}
        loading={participants.status === "loading"}
      />
      <Dialog maxWidth="xl" open={openAddParticipantDialog} onClose={() => setOpenAddParticipantDialog(false)}>
        <DialogTitle>Add new user to the conference</DialogTitle>
        <DialogContent>
          <ParticipantUsersGrid handleAddParticipant={handleAddParticipant} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddParticipantDialog(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <UserRoleManagementDialog
        user={selectedUser}
        open={openRoleDialog}
        onClose={() => setOpenRoleDialog(false)}
        onRoleChange={handleRoleChange}
      />
      <FormErrorAlert response={participants} />
      <FormErrorAlert response={addResponse} />
      <FormErrorAlert response={deleteResponse} />
    </>
  );
};
