import axios, { AxiosRequestConfig } from "axios";
import { useMemo } from "react";
import { useCallback, useEffect, useState } from "react";
import { DeleteParticipantResponse, GetParticipantsData, GetParticipantsResponse } from "./ParticipantsGrid.types";
import { GridRowsProp, GridColDef, GridPaginationModel, GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { User } from "../../types/User";
import { useGetApi } from "../../hooks/UseGetApi";

export const useGetParticipantsApi = (paging: GridPaginationModel, conferenceId: number): GetParticipantsResponse => {
  const config: AxiosRequestConfig<any> = useMemo(
    () => ({
      params: { pageIndex: paging.page, pageSize: paging.pageSize },
    }),
    [paging]
  );

  return useGetApi<GetParticipantsData>(`/Conference/${conferenceId}/participants`, config);
};

export const useAddParticipantApi = (conferenceId: number) => {
  const [response, setResponse] = useState<DeleteParticipantResponse>({
    data: { userId: null },
    isError: false,
    isLoading: true,
  });

  const post = useCallback(
    (userId: number) => {
      axios
        .post(`/Conference/${conferenceId}/participants/${userId}`)
        .then((response) => {
          setResponse({
            data: { userId: userId },
            isError: false,
            isLoading: false,
          });
        })
        .catch((error) => {
          console.error(error);
          setResponse({
            data: { userId: userId },
            isError: true,
            isLoading: false,
          });
        });
    },
    [conferenceId]
  );

  return {
    data: response.data,
    isError: response.isError,
    isLoading: response.isLoading,
    post: post,
  };
};

export const useDeleteParticipantApi = (conferenceId: number) => {
  const [response, setResponse] = useState<DeleteParticipantResponse>({
    data: { userId: null },
    isError: false,
    isLoading: true,
  });

  const deleteParticipant = useCallback(
    (userId: number) => {
      axios
        .delete(`/Conference/${conferenceId}/participants/${userId}`)
        .then((response) => {
          setResponse({
            data: { userId: userId },
            isError: false,
            isLoading: false,
          });
        })
        .catch((error) => {
          console.error(error);
          setResponse({
            data: { userId: userId },
            isError: true,
            isLoading: false,
          });
        });
    },
    [conferenceId]
  );

  return {
    data: response.data,
    isError: response.isError,
    isLoading: response.isLoading,
    deleteParticipant: deleteParticipant,
  };
};

export const useParticipantsGridProps = (
  users: GetParticipantsResponse,
  conferenceId: number
): [GridRowsProp, GridColDef[]] => {
  const [rows, setRows] = useState<User[]>(users.data?.items ?? []);
  const {
    data: deleteData,
    isError: isDeleteError,
    isLoading: isDeleteLoading,
    deleteParticipant,
  } = useDeleteParticipantApi(conferenceId);

  useEffect(() => {
    if (!users.isLoading && !users.isError) {
      setRows(users.data?.items ?? []);
    }
  }, [users]);

  useEffect(() => {
    if (!isDeleteError && !isDeleteLoading) {
      setRows((prevRows) => prevRows.filter((row) => row.id !== deleteData.userId));
    }
  }, [deleteData, isDeleteError, isDeleteLoading]);

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
          onClick={() => deleteParticipant(params.row.id)}
        />,
      ],
    },
  ];

  return [rows, columns];
};
