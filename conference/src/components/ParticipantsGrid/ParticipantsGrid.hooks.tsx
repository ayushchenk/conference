import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { GridActionsCellItem, GridColDef, GridPaginationModel, GridRowsProp } from "@mui/x-data-grid";
import { useDeleteApi } from "../../hooks/useDeleteApi";
import { useGetApi } from "../../hooks/UseGetApi";
import { useMemoPaging } from "../../hooks/UseMemoPaging";
import { usePostApi } from "../../hooks/UsePostApi";
import { User } from "../../types/User";
import { GetParticipantsData, GetParticipantsResponse } from "./ParticipantsGrid.types";

export const useGetParticipantsApi = (paging: GridPaginationModel, conferenceId: number): GetParticipantsResponse => {
  const config = useMemoPaging(paging);
  return useGetApi<GetParticipantsData>(`/Conference/${conferenceId}/participants`, config);
};

export const useAddParticipantApi = (conferenceId: number) => {
  return usePostApi<{}, {}>(`/Conference/${conferenceId}/participants/{0}`);
};

export const useDeleteParticipantApi = (conferenceId: number) => {
  return useDeleteApi<{}, {}>(`/Conference/${conferenceId}/participants/{0}`);
};

export const useParticipantsGridProps = (
  users: GetParticipantsResponse,
  conferenceId: number
): [GridRowsProp, GridColDef[]] => {
  const [rows, setRows] = useState<User[]>(users.data?.items ?? []);
  const [deletedUserId, setDeletedUserId] = useState<number | null>(null);
  const { response, performDelete: deleteParticipant } = useDeleteParticipantApi(conferenceId);

  useEffect(() => {
    if (!users.isLoading && !users.isError) {
      setRows(users.data?.items ?? []);
    }
  }, [users]);

  function handleDelete(userId: number) {
    setDeletedUserId(userId);
    deleteParticipant({}, userId);
  }
  useEffect(() => {
    if (!response.isError && !response.isLoading && deletedUserId) {
      setRows((prevRows) => prevRows.filter((row) => row.id !== deletedUserId));
      setDeletedUserId(null);
    }
  }, [response, deletedUserId]);

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
      width: 150
    },
    {
      field: "actions",
      type: "actions",
      width: 80,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete Participant"
          onClick={() => handleDelete(params.row.id)}
        />,
      ],
    },
  ];

  return [rows, columns];
};
