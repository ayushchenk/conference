import { useCallback, useEffect, useRef, useState } from "react";
import { DataGrid, GridPaginationModel } from "@mui/x-data-grid";
import { useGetNonParticipantsApi, useParticipantUsersGridProps as useParticipantUsersGridColumns } from "./ParticipantUsersGrid.hooks";
import { defaultPage } from "../../util/Constants";
import { ParticipantUsersGridProps } from "./ParticipantUsersGrid.types";
import { FormErrorAlert } from "../FormErrorAlert";
import { NoResultsOverlay } from "../Util/NoResultsOverlay";
import { NoRowsOverlay } from "../Util/NoRowsOverlay";
import { User } from "../../types/User";
import { TextField } from "@mui/material";

export const ParticipantUsersGrid: React.FC<ParticipantUsersGridProps> = ({ handleAddParticipant }) => {
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const [rows, setRows] = useState<User[]>([]);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const handleAdd = useCallback((user: User) => {
    handleAddParticipant(user);
    setRows(prevRows => [...prevRows].filter(u => u.id !== user.id));
  }, [handleAddParticipant]);

  const [currentPage, setCurrentPage] = useState<GridPaginationModel>(defaultPage);
  const users = useGetNonParticipantsApi(currentPage, debouncedQuery);
  const columns = useParticipantUsersGridColumns(handleAdd);

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
    }, 500);
  }, []);

  return (
    <>
      <TextField
        fullWidth
        margin="normal"
        id="query"
        name="query"
        label="Search query"
        placeholder="Search by name or email"
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
        rowCount={users.data?.totalCount ?? 0}
        paginationMode="server"
        slots={{
          noRowsOverlay: () => <NoRowsOverlay>No users available</NoRowsOverlay>,
          noResultsOverlay: NoResultsOverlay
        }}
      />
      <FormErrorAlert response={users} />
    </>
  );
};
