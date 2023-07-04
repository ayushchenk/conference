import { Link } from "react-router-dom";
import { GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { useGetApi } from "../../hooks/UseGetApi";
import { useMemoPaging } from "../../hooks/UseMemoPaging";
import { GetSubmissionsData, GetSubmissionsResponse } from "./SubmissionsGrid.types";
import moment from "moment";
import { useMemo } from "react";
import { Auth } from "../../logic/Auth";
import { useConferenceId } from "../../hooks/UseConferenceId";

export const useGetSubmissionsApi = (paging: GridPaginationModel, query?: string): GetSubmissionsResponse => {
  const conferenceId = useConferenceId();
  const config = useMemoPaging(paging);
  return useGetApi<GetSubmissionsData>(`/Conference/${conferenceId}/submissions${query && `?query=${query}`}`, config);
};

export const useSubmissionsGridColumns = (): GridColDef[] => {
  const conferenceId = useConferenceId();

  return useMemo(() => {
    const columns: GridColDef[] = [
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

    if (Auth.isChair(conferenceId)) {
      columns.splice(2, 0, {
        headerName: "Author",
        field: "authorName",
        maxWidth: 200,
        flex: 1
      },);
    }

    return columns;
  }, [conferenceId]);
};
