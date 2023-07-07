import { useCallback, useEffect, useState } from "react";
import { DataGrid, GridPaginationModel } from "@mui/x-data-grid";
import { useGetNonParticipantsApi, useParticipantUsersGridProps as useParticipantUsersGridColumns } from "./NonParticipantUsersGrid.hooks";
import { defaultPage } from "../../util/Constants";
import { ParticipantUsersGridProps } from "./NonParticipantUsersGrid.types";
import { FormErrorAlert2 } from "../FormErrorAlert";
import { NoResultsOverlay } from "../Util/NoResultsOverlay";
import { NoRowsOverlay } from "../Util/NoRowsOverlay";
import { User } from "../../types/User";
import { useDebounceQuery } from "../../hooks/UseDebouncedQuery";

export const NonParticipantUsersGrid: React.FC<ParticipantUsersGridProps> = ({ handleAddParticipant }) => {
  const [rows, setRows] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState<GridPaginationModel>(defaultPage);
  const { debouncedQuery, debouncedInput } = useDebounceQuery("Search by name, email, country or affiliation");

  const handleAdd = useCallback((user: User) => {
    handleAddParticipant(user);
    setRows(prevRows => [...prevRows].filter(u => u.id !== user.id));
  }, [handleAddParticipant]);

  const users = useGetNonParticipantsApi(currentPage, debouncedQuery);
  const columns = useParticipantUsersGridColumns(handleAdd);

  useEffect(() => {
    if (users.data) {
      setRows(users.data.items);
    }
  }, [users]);

  return (
    <>
      {debouncedInput}
      <DataGrid
        autoHeight
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel: currentPage } }}
        pageSizeOptions={[5, 10, 15, 25]}
        onPaginationModelChange={setCurrentPage}
        loading={users.isLoading}
        rowCount={users.data?.totalCount ?? 0}
        paginationMode="server"
        slots={{
          noRowsOverlay: () => <NoRowsOverlay>No users available</NoRowsOverlay>,
          noResultsOverlay: NoResultsOverlay
        }}
      />
      <FormErrorAlert2 error={users.error} />
    </>
  );
};
