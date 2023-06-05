import { DataGrid, GridPaginationModel } from "@mui/x-data-grid";
import { useParticipantsGridProps, useGetParticipantsApi, useAddParticipantApi } from "./ParticipantsGrid.hooks";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { ParticipantUsersGrid } from "../ParticipantUsersGrid";
import { defaultPage } from "../../util/Constants";
import { User } from "../../types/User";

export const ParticipantsGrid = () => {
  const { conferenceId } = useParams();
  const [currentPage, setCurrentPage] = useState<GridPaginationModel>(defaultPage);
  const participants = useGetParticipantsApi(currentPage, Number(conferenceId));

  const { response, post: addParticipant } = useAddParticipantApi(Number(conferenceId));

  const [initialRows, columns] = useParticipantsGridProps(participants, Number(conferenceId));
  const [rows, setRows] = useState(initialRows);
  const [openAddParticipantDialog, setOpenAddParticipantDialog] = useState(false);

  useEffect(() => {
    setRows(initialRows);
  }, [initialRows]);

  const [newParticipantData, setNewParticipantData] = useState<User | null>(null);

  const handleAddParticipantClick = () => {
    setOpenAddParticipantDialog(true);
  };
  const handleAddParticipant = (user: User) => {
    addParticipant({}, user.id);
    setNewParticipantData(user);
  };
  useEffect(() => {
    if (!response.isLoading && !response.isError && newParticipantData) {
      setOpenAddParticipantDialog(false);

      //skip new user if already in table
      if (!rows.map(r => r.id).includes(newParticipantData.id)) {
        setRows((rows) => [...rows, newParticipantData]);
      }
    }
  }, [response, newParticipantData]);

  return (
    <>
      <Button onClick={handleAddParticipantClick}>Add Participant</Button>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel: currentPage } }}
        pageSizeOptions={[5, 10, 15, 25]}
        onPaginationModelChange={setCurrentPage}
        loading={participants.isLoading}
      />
      <Dialog maxWidth="md" open={openAddParticipantDialog} onClose={() => setOpenAddParticipantDialog(false)}>
        <DialogTitle>Add new user to the conference</DialogTitle>
        <DialogContent>
          <ParticipantUsersGrid handleAddParticipant={handleAddParticipant} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddParticipantDialog(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
