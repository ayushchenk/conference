import { useEffect, useState } from "react";
import { GetParticipantsData, GetParticipantsResponse } from "./ParticipantsGrid.types";
import { GridRowsProp, GridColDef, GridPaginationModel, GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { User } from "../../types/User";
import { useGetApi } from "../../hooks/UseGetApi";
import { usePostApi } from "../../hooks/UsePostApi";
import { useMemoPaging } from "../../hooks/UseMemoPaging";
import { useDeleteApi } from "../../hooks/UseDeleteApi";

export const useGetParticipantsApi = (paging: GridPaginationModel, conferenceId: number): GetParticipantsResponse => {
  const config = useMemoPaging(paging);
  return useGetApi<GetParticipantsData>(`/Conference/${conferenceId}/participants`, config);
};

export const useAddParticipantApi = (conferenceId: number) => {
  return usePostApi<{}, {}>(`/Conference/${conferenceId}/participants/{0}`);
};

export const useDeleteParticipantApi = (conferenceId: number) => {
  return useDeleteApi<{}>(`/Conference/${conferenceId}/participants/{0}`);
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
    deleteParticipant(userId);
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
    },
    {
      headerName: "Email",
      field: "email",
      width: 256,
    },
    {
      headerName: "Full Name",
      field: "fullName",
      maxWidth: 160,
    },
    {
      headerName: "Country",
      field: "country",
    },
    {
      headerName: "Affiliation",
      field: "affiliation",
    },
    {
      headerName: "Webpage",
      field: "webpage",
    },
    {
      headerName: "Roles",
      field: "roles",
    },
    {
      field: "actions",
      type: "actions",
      width: 80,
      flex: 1,
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