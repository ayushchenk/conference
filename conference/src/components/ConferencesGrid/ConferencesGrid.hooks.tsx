import { GetConferencesData, GetConferencesResponse } from "./ConferencesGrid.types";
import { GridRowsProp, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import moment from "moment";
import { useGetApi } from "../../hooks/UseGetApi";
import { AxiosRequestConfig } from "axios";
import { useMemo } from "react";

export const useGetConferencesApi = (paging: GridPaginationModel): GetConferencesResponse => {
  const config: AxiosRequestConfig<any> = useMemo(
    () => ({
      params: { pageIndex: paging.page, pageSize: paging.pageSize },
    }),
    [paging]
  );

  return useGetApi<GetConferencesData>(`/Conference`, config);
};

export const useConferencesGridProps = (conferences: GetConferencesResponse): [GridRowsProp, GridColDef[]] => {
  const rows: GridRowsProp = conferences.data?.items ?? [];
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

  return [rows, columns];
};
