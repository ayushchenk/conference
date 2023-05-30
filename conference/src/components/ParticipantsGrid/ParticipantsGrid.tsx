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

export const ParticipantsGrid = () => {
  const { conferenceId } = useParams();
  const [currentPage, setCurrentPage] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });
  const participants = useGetParticipantsApi(currentPage, Number(conferenceId));

  const {
    data: addData,
    isError: isAddError,
    isLoading: isAddLoading,
    post: addParticipant,
  } = useAddParticipantApi(Number(conferenceId));

  const [rows, columns] = useParticipantsGridProps(participants, Number(conferenceId));
  const [openAddParticipantDialog, setOpenAddParticipantDialog] = useState(false);

  const handleAddParticipantClick = () => {
    setOpenAddParticipantDialog(true);
  };

  const handleAddParticipant = ({ id }: { id: number }) => {
    addParticipant(id);
  };
  useEffect(() => {
    console.log(isAddLoading, isAddError, "@");
    if (!isAddLoading && !isAddError) {
      setOpenAddParticipantDialog(false);
      setCurrentPage({
        page: 0,
        pageSize: 10,
      });
    }
  }, [addData, isAddError, isAddLoading]);

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
