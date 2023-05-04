import axios from "axios";
import { useEffect, useState } from "react";
import { GetConferencesResponse } from "./ConferencesGrid.types";
import { GridRowsProp, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { Link } from "react-router-dom";

export const useGetConferencesApi = (paging: GridPaginationModel) => {
    console.log(paging);

    const [response, setResponse] = useState<GetConferencesResponse>({
        data: [],
        isError: false,
        isLoading: true
    });

    useEffect(() => {
        axios.get("/conferences")
            .then(response => {
                setResponse({
                    data: response.data,
                    isError: false,
                    isLoading: false
                });
            })
            .catch(error => {
                console.error(error);
                setResponse({
                    data: [],
                    isError: true,
                    isLoading: false
                });
            });

    }, []);

    return response;
};

export const useConferencesGridProps = (conferences: GetConferencesResponse)
    : [GridRowsProp, GridColDef[]] => {
    const rows: GridRowsProp = conferences.data;
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
            renderCell: (params) => <Link to={`/conference/${params.row.id}`}>{params.row.title}</Link>
        },
        {
            headerName: "Start Date",
            field: "start",
            minWidth: 150
        },
        {
            headerName: "End Date",
            field: "end",
            minWidth: 150
        }
    ];

    return [rows, columns];
};