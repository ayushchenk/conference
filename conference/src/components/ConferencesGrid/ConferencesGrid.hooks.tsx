import moment from "moment";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { GridActionsCellItem, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { useDeleteApi } from "../../hooks/UseDeleteApi";
import { useGetApi } from "../../hooks/UseGetApi";
import { useMemoPaging } from "../../hooks/UseMemoPaging";
import { GetConferencesData, GetConferencesResponse } from "./ConferencesGrid.types";
import { Auth } from "../../util/Auth";
import { useMemo } from "react";
import { Conference } from "../../types/Conference";

export const useGetConferencesApi = (paging: GridPaginationModel): GetConferencesResponse => {
  const config = useMemoPaging(paging);
  return useGetApi<GetConferencesData>(`/Conference`, config);
};

export const useDeleteConferenceApi = () => {
  return useDeleteApi<{}, {}>(`/Conference/{0}`);
};

export const useConferencesGridColumns = (handleDelete: (conference: Conference) => void): GridColDef[] => {
  return useMemo(() => {
    const columns: GridColDef[] = [
      {
        headerName: "#",
        field: "id",
        width: 60,
        type: "number"
      },
      {
        headerName: "Acronym",
        field: "acronym",
        width: 150
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
        width: 120,
        valueFormatter: (params) => moment(params?.value).format("DD/MM/YYYY"),
      },
      {
        headerName: "End Date",
        field: "endDate",
        width: 120,
        valueFormatter: (params) => moment(params?.value).format("DD/MM/YYYY"),
      },
    ];

    if (Auth.isAdmin()) {
      columns.push({
        field: "actions",
        type: "actions",
        width: 80,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete Conference"
            onClick={() => handleDelete(params.row)}
          />
        ],
      });

    }

    return columns;
  }, [handleDelete]);
};
