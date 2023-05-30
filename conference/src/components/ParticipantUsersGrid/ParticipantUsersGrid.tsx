import { useEffect, useState } from "react";
import { DataGrid, GridPaginationModel } from "@mui/x-data-grid";
import { useParticipantUsersGridProps } from "./ParticipantUsersGrid.hooks";
import { useGetUsersApi } from "../UsersGrid/UsersGrid.hooks";

type ParticipantUsersGridProps = {
  handleAddParticipant: (params: { id: number }) => void;
};

export const ParticipantUsersGrid: React.FC<ParticipantUsersGridProps> = ({ handleAddParticipant }) => {
  const [currentPage, setCurrentPage] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });
  const users = useGetUsersApi(currentPage);

  const [rowCountState, setRowCountState] = useState(users?.data.totalCount || 0);
  useEffect(() => {
    setRowCountState((prevRowCountState) =>
      users?.data.totalCount !== undefined ? users?.data.totalCount : prevRowCountState
    );
  }, [users?.data.totalCount, setRowCountState]);

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
