import { AxiosRequestConfig } from "axios";
import { useEffect, useState, useMemo } from "react";
import { GridRowsProp, GridColDef, GridPaginationModel, GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { GetUsersData, GetUsersResponse } from "./UsersGrid.types";
import { User } from "../../types/User";
import { useGetApi } from "../../hooks/UseGetApi";
import { useDeleteApi } from "../../hooks/useDeleteApi";

export const useGetUsersApi = (paging: GridPaginationModel): GetUsersResponse => {
  const config: AxiosRequestConfig<any> = useMemo(
    () => ({
      params: { pageIndex: paging.page, pageSize: paging.pageSize },
    }),
    [paging]
  );

  return useGetApi<GetUsersData>(`/User`, config);
};

export const useDeleteUserApi = () => {
  return useDeleteApi<null>(`/User/`);
};

export const useUsersGridProps = (users: GetUsersResponse): [GridRowsProp, GridColDef[]] => {
  const [rows, setRows] = useState<User[]>(users.data?.items ?? []);
  const [deletedUserId, setDeletedUserId] = useState<number | null>(null);
  const { response, performDelete: deleteUser } = useDeleteUserApi();

  useEffect(() => {
    if (!users.isLoading && !users.isError) {
      setRows(users.data?.items ?? []);
    }
  }, [users]);

  function handleDelete(userId: number) {
    setDeletedUserId(userId);
    deleteUser(String(userId));
  }

  useEffect(() => {
    if (!response.isError && !response.isLoading && deletedUserId) {
      setRows((prevRows) => prevRows.filter((row) => row.id !== deletedUserId));
    }
  }, [response, deletedUserId]);

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
        <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={() => handleDelete(params.row.id)} />,
        <GridActionsCellItem icon={<AddIcon />} label="Add to Conference" showInMenu />,
      ],
    },
  ];

  return [rows, columns];
};
