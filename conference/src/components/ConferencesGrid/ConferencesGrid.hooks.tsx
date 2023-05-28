import axios from "axios";
import { useEffect, useState } from "react";
import { GetConferencesResponse } from "./ConferencesGrid.types";
import { GridRowsProp, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import moment from "moment";

export const useGetConferencesApi = (paging: GridPaginationModel) => {
  const [response, setResponse] = useState<GetConferencesResponse>({
    data: { items: [] },
    isError: false,
    isLoading: true,
  });

  useEffect(() => {
    axios
      .get(`/Conference`, { params: { pageIndex: paging["page"], pageSize: paging["pageSize"] } })
      .then((response) => {
        setResponse({
          data: response.data,
          isError: false,
          isLoading: false,
        });
      })
      .catch((error) => {
        console.error(error);
        setResponse({
          data: { items: [] },
          isError: true,
          isLoading: false,
        });
      });
  }, []);

  return response;
};

export const useConferencesGridProps = (conferences: GetConferencesResponse): [GridRowsProp, GridColDef[]] => {
  const rows: GridRowsProp = conferences.data.items;
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
      field: "start",
      minWidth: 120,
      valueFormatter: (params) => moment(params?.value).format("DD/MM/YYYY"),
    },
    {
      headerName: "End Date",
      field: "end",
      minWidth: 120,
      valueFormatter: (params) => moment(params?.value).format("DD/MM/YYYY"),
    },
  ];

  return [rows, columns];
};
