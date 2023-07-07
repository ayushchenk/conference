import { useMemo } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { GridActionsCellItem, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { useDeleteApi } from "../../hooks/UseDeleteApi";
import { useGetApi } from "../../hooks/UseGetApi";
import { useMemoPaging } from "../../hooks/UseMemoPaging";
import { usePostApi } from "../../hooks/UsePostApi";
import { User } from "../../types/User";
import { GetParticipantsData } from "./ConferenceParticipantsGrid.types";
import { Auth } from "../../util/Auth";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

export const useGetParticipantsApi = (paging: GridPaginationModel, conferenceId: number) => {
  const config = useMemoPaging(paging);
  return useGetApi<GetParticipantsData>(`/Conference/${conferenceId}/participants`, config);
};

export const useAddParticipantApi = (conferenceId: number) => {
  return usePostApi<{}, {}>(`/Conference/${conferenceId}/participants/{0}`);
};

export const useDeleteParticipantApi = (conferenceId: number) => {
  return useDeleteApi<{}, {}>(`/Conference/${conferenceId}/participants/{0}`);
};

export const useConferenceParticipantsGridColumns = (
  conferenceId: number,
  handleDelete: (user: User) => void,
  openRoleChange: (user: User) => void) => {

  const columns = useMemo(() => {
    const columns: GridColDef[] = [
      {
        headerName: "#",
        field: "id",
        type: "number",
        width: 60
      },
      {
        headerName: "Email",
        field: "email",
        minWidth: 150,
        flex: 1,
      },
      {
        headerName: "Full Name",
        field: "fullName",
        minWidth: 150,
        flex: 1,
      },
      {
        headerName: "Country",
        field: "country",
        minWidth: 150,
        flex: 1,
      },
      {
        headerName: "Affiliation",
        field: "affiliation",
        minWidth: 150,
        flex: 1,
      },
      {
        headerName: "Roles",
        field: "roles",
        width: 150,
        valueFormatter: (params) => params.value[conferenceId] ?? []
      },
    ];

    if (Auth.isAdmin() || Auth.isChair(conferenceId)) {
      columns.push({
        field: "actions",
        type: "actions",
        width: 80,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete Participant"
            onClick={() => handleDelete(params.row)}
          />,
          <GridActionsCellItem
            icon={<ManageAccountsIcon />}
            label="Manage Roles"
            onClick={() => openRoleChange(params.row)}
          />
        ],
      });
    }

    return columns;
  }, [conferenceId, handleDelete, openRoleChange]);

  return columns;
};
