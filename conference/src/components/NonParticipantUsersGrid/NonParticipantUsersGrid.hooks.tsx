import AddIcon from "@mui/icons-material/Add";
import { GridColDef, GridActionsCellItem, GridPaginationModel } from "@mui/x-data-grid";
import { useMemo } from "react";
import { useConferenceId } from "../../hooks/UseConferenceId";
import { useGetApi } from "../../hooks/UseGetApi";
import { PageData } from "../../types/ApiResponse";
import { User } from "../../types/User";
import { useMemoPaging } from "../../hooks/UseMemoPaging";

export const useGetNonParticipantsApi = (page: GridPaginationModel, query?: string) => {
  const conferenceId = useConferenceId();
  const path = import.meta.env.VITE_CONFERENCE_API_URL + `/conference/${conferenceId}/non-participants${query && `/?query=${query}`}`;
  const config = useMemoPaging(page);
  return useGetApi<PageData<User>>(path, config);
}

export const useParticipantUsersGridProps = (handleAddParticipant: Function): GridColDef[] => {
  return useMemo(() => {
    return [
      {
        headerName: "#",
        field: "id",
        type: "number",
        width: 60
      },
      {
        headerName: "Email",
        field: "email",
        flex: 1
      },
      {
        headerName: "Full Name",
        field: "fullName",
        flex: 1
      },
      {
        headerName: "Country",
        field: "country",
        flex: 1
      },
      {
        headerName: "Affiliation",
        field: "affiliation",
        maxWidth: 150,
        flex: 1
      },
      {
        field: "actions",
        type: "actions",
        width: 50,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<AddIcon />}
            label="Add"
            onClick={() => handleAddParticipant(params.row)} />
        ]
      },
    ]
  }, [handleAddParticipant]);
};
