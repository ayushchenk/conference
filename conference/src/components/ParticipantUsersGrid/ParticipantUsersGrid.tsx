import { useState } from "react";
import { DataGrid, GridPaginationModel } from "@mui/x-data-grid";
import { useParticipantUsersGridProps as useParticipantUsersGridColumns } from "./ParticipantUsersGrid.hooks";
import { useGetUsersApi } from "../UsersGrid/UsersGrid.hooks";
import { defaultPage } from "../../util/Constants";
import { ParticipantUsersGridProps } from "./ParticipantUsersGrid.types";
import { FormErrorAlert } from "../FormErrorAlert";

export const ParticipantUsersGrid: React.FC<ParticipantUsersGridProps> = ({ handleAddParticipant }) => {
  const [currentPage, setCurrentPage] = useState<GridPaginationModel>(defaultPage);
  const users = useGetUsersApi(currentPage);
  const columns = useParticipantUsersGridColumns(handleAddParticipant);

  return (
    <>
      <DataGrid
        rows={users.data?.items ?? []}
        columns={columns}
        initialState={{ pagination: { paginationModel: currentPage } }}
        pageSizeOptions={[5, 10, 15, 25]}
        onPaginationModelChange={setCurrentPage}
        loading={users.status === "loading"}
        rowCount={users.data?.totalCount ?? 0}
        paginationMode="server"
      />
      <FormErrorAlert response={users} />
    </>
  );
};
