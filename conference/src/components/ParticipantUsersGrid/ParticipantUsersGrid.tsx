import { useState, useEffect } from "react";
import { DataGrid, GridPaginationModel } from "@mui/x-data-grid";
import { useParticipantUsersGridProps } from "./ParticipantUsersGrid.hooks";
import { useGetUsersApi } from "../UsersGrid/UsersGrid.hooks";
import { defaultPage } from "../../util/Constants";
import { User } from "../../types/User";

type ParticipantUsersGridProps = {
  handleAddParticipant: (user: User) => void;
};

export const ParticipantUsersGrid: React.FC<ParticipantUsersGridProps> = ({ handleAddParticipant }) => {
  const [currentPage, setCurrentPage] = useState<GridPaginationModel>(defaultPage);

  const users = useGetUsersApi(currentPage);

  const [rowCountState, setRowCountState] = useState(users.data?.totalCount || 0);
  useEffect(() => {
    setRowCountState((prevRowCountState) => users.data?.totalCount ?? prevRowCountState);
  }, [rowCountState, setRowCountState, users]);

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
