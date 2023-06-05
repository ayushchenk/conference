import { Link } from "react-router-dom";
import { GridColDef, GridPaginationModel, GridRowsProp } from "@mui/x-data-grid";
import { useGetApi } from "../../hooks/UseGetApi";
import { useMemoPaging } from "../../hooks/UseMemoPaging";
import { GetSubmissionsData, GetSubmissionsResponse } from "./SubmissionsGrid.types";

export const useGetSubmissionsApi = (paging: GridPaginationModel, conferenceId: number): GetSubmissionsResponse => {
  const config = useMemoPaging(paging);
  return useGetApi<GetSubmissionsData>(`/Conference/${conferenceId}/submissions`, config);
};

export const useSubmissionsGridProps = (submissions: GetSubmissionsResponse): [GridRowsProp, GridColDef[]] => {
  const rows = submissions.data?.items ?? [];

  const columns: GridColDef[] = [
    {
      headerName: "#",
      field: "id",
    },
    {
      headerName: "Title",
      field: "title",
      flex: 1,
      renderCell: (params) => (
        <Link to={`/conferences/${params.row.conferenceId}/submissions/${params.row.id}`}>{params.row.title}</Link>
      ),
    },
    {
      headerName: "Author",
      field: "authorName",
    },
    {
      headerName: "Author Email",
      field: "authorEmail",
    },
    {
      headerName: "Status",
      field: "statusLabel",
    },
  ];

  return [rows, columns];
};
