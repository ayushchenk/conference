import { Link } from "react-router-dom";
import { GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { useGetApi } from "../../hooks/UseGetApi";
import { useMemoPaging } from "../../hooks/UseMemoPaging";
import { GetSubmissionsData, GetSubmissionsResponse } from "./SubmissionsGrid.types";
import moment from "moment";
import { useMemo } from "react";
import { Auth } from "../../util/Auth";
import { useConferenceId } from "../../hooks/UseConferenceId";
import { Submission } from "../../types/Conference";

export const useGetSubmissionsApi = (paging: GridPaginationModel, query?: string): GetSubmissionsResponse => {
  const conferenceId = useConferenceId();
  const config = useMemoPaging(paging);
  return useGetApi<GetSubmissionsData>(import.meta.env.VITE_CONFERENCE_API_URL + `/Conference/${conferenceId}/submissions${query && `?query=${query}`}`, config);
};

export const useSubmissionsGridColumns = (): GridColDef[] => {
  const conferenceId = useConferenceId();

  return useMemo(() => {
    const columns: GridColDef<Submission>[] = [
      {
        headerName: "#",
        field: "id",
        width: 60,
        type: "number",
        renderCell: (params) =>
          <div style={{ minHeight: "52px", alignItems: "center", display: "flex" }}>
            <label>{params.id}</label>
          </div>
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

      columns.splice(3, 0, {
        headerName: "Reviewers",
        field: "reviewers",
        maxWidth: 200,
        flex: 1,
        renderCell: (params) => {
          const reviewers = params.row.reviewers
            .map((reviewer, index) => <div key={index}>{reviewer}</div>);

          return <div style={{ padding: "5px" }}>{reviewers}</div>;
        }
      },);
    }

    return columns;
  }, [conferenceId]);
};
