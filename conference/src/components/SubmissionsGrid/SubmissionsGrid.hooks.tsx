import { Link } from "react-router-dom";
import { GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { useGetApi } from "../../hooks/UseGetApi";
import { useMemoPaging } from "../../hooks/UseMemoPaging";
import { GetSubmissionsData, GetSubmissionsResponse } from "./SubmissionsGrid.types";
import moment from "moment";
import { useMemo } from "react";

export const useGetSubmissionsApi = (paging: GridPaginationModel, conferenceId: number): GetSubmissionsResponse => {
  const config = useMemoPaging(paging);
  return useGetApi<GetSubmissionsData>(`/Conference/${conferenceId}/submissions`, config);
};

export const useSubmissionsGridColumns = (): GridColDef[] => {
  return useMemo(() => {
    return [
      {
        headerName: "#",
        field: "id",
        width: 60,
        type: "number"
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
        maxWidth: 150,
        flex: 1
      },
      {
        headerName: "Status",
        field: "statusLabel",
        width: 120
      },
      {
        headerName: "Upload Date",
        field: "createdOn",
        width: 120,
        valueFormatter: (params) => moment(params?.value).format("DD/MM/YYYY"),
      },
    ];
  }, []);
};
