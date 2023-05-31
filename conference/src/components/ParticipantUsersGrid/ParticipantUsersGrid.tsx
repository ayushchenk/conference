import { useState } from "react";
import { DataGrid, GridPaginationModel } from "@mui/x-data-grid";
import { useParticipantUsersGridProps } from "./ParticipantUsersGrid.hooks";
import { useGetUsersApi } from "../UsersGrid/UsersGrid.hooks";
import { defaultPage } from "../../util/Constants";

type ParticipantUsersGridProps = {
  handleAddParticipant: (params: { id: number }) => void;
};

export const ParticipantUsersGrid: React.FC<ParticipantUsersGridProps> = ({ handleAddParticipant }) => {
  const [currentPage, setCurrentPage] = useState<GridPaginationModel>(defaultPage);

  const users = useGetUsersApi(currentPage);

  const [rowCountState, setRowCountState] = useState(users?.data.totalCount || 0);
  setRowCountState((prevRowCountState) => users?.data.totalCount ?? prevRowCountState);

  const [rows, columns] = useParticipantUsersGridProps(users, handleAddParticipant);
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      initialState={{ pagination: { paginationModel: currentPage } }}
      pageSizeOptions={[5, 10, 15, 25]}
      onPaginationModelChange={setCurrentPage}
      loading={users.isLoading}
      rowCount={rowCountState}
      paginationMode="server"
    />
  );
};
