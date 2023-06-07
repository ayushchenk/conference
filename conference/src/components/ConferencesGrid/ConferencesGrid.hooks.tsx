import moment from "moment";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { GridActionsCellItem, GridColDef, GridPaginationModel, GridRowsProp } from "@mui/x-data-grid";
import { useGetApi } from "../../hooks/UseGetApi";
import { Conference } from "../../types/Conference";
import { GetConferencesData, GetConferencesResponse } from "./ConferencesGrid.types";
import { useDeleteApi } from "../../hooks/UseDeleteApi";
import { useMemoPaging } from "../../hooks/UseMemoPaging";
import { Auth } from "../../logic/Auth";

export const useGetConferencesApi = (paging: GridPaginationModel): GetConferencesResponse => {
  const config = useMemoPaging(paging);
  return useGetApi<GetConferencesData>(`/Conference`, config);
};

export const useDeleteConferenceApi = () => {
  return useDeleteApi<{}, {}>(`/Conference/{0}`);
};

export const useConferencesGridProps = (conferences: GetConferencesResponse): [GridRowsProp, GridColDef[]] => {
  const [rows, setRows] = useState<Conference[]>(conferences.data?.items ?? []);
  const [deletedConferenceId, setDeletedConferenceId] = useState<number | null>(null);
  const { response, performDelete: deleteConference } = useDeleteConferenceApi();

  useEffect(() => {
    if (!conferences.isLoading && !conferences.isError) {
      setRows(conferences.data?.items ?? []);
    }
  }, [conferences]);

  function handleDelete(conferenceId: number) {
    setDeletedConferenceId(conferenceId);
    deleteConference(String(conferenceId));
  }
  useEffect(() => {
    if (!response.isError && !response.isLoading && deletedConferenceId) {
      setRows((prevRows) => prevRows.filter((row) => row.id !== deletedConferenceId));
      setDeletedConferenceId(null);
    }
  }, [response, deletedConferenceId]);

  const columns: GridColDef[] = [
    {
      headerName: "#",
      field: "id",
    },
    {
      headerName: "Acronym",
      field: "acronym",
    },
    {
      headerName: "Name",
      field: "title",
      flex: 1,
      renderCell: (params) => <Link to={`/conferences/${params.row.id}`}>{params.row.title}</Link>,
    },
    {
      headerName: "Start Date",
      field: "startDate",
      minWidth: 120,
      valueFormatter: (params) => moment(params?.value).format("DD/MM/YYYY"),
    },
    {
      headerName: "End Date",
      field: "endDate",
      minWidth: 120,
      valueFormatter: (params) => moment(params?.value).format("DD/MM/YYYY"),
    },
  ];

  if (Auth.isAdmin()) {
    columns.push({
      field: "actions",
      type: "actions",
      width: 80,
      flex: 1,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete Conference"
          onClick={() => handleDelete(params.row.id)}
        />
      ],
    });
  }

  return [rows, columns];
};
