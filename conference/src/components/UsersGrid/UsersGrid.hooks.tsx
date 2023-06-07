import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { Tooltip } from "@mui/material";
import {
  GridActionsCellItem,
  GridColDef,
  GridPaginationModel,
  GridRenderCellParams,
  GridRowsProp,
} from "@mui/x-data-grid";
import { useDeleteApi } from "../../hooks/UseDeleteApi";
import { useGetApi } from "../../hooks/UseGetApi";
import { useMemoPaging } from "../../hooks/UseMemoPaging";
import { usePostApi } from "../../hooks/UsePostApi";
import { User } from "../../types/User";
import { AdjustUserRoleRequest, GetUsersData, GetUsersResponse } from "./UsersGrid.types";
import { Link } from "react-router-dom";

export const useAddUserRoleApi = () => {
  return usePostApi<AdjustUserRoleRequest, {}>("/User/{0}/role");
};

export const useRemoveUserRoleApi = () => {
  return useDeleteApi<AdjustUserRoleRequest, {}>("/User/{0}/role");
};

export const useGetUsersApi = (paging: GridPaginationModel): GetUsersResponse => {
  const config = useMemoPaging(paging);
  return useGetApi<GetUsersData>(`/User`, config);
};

export const useDeleteUserApi = () => {
  return useDeleteApi<{}, {}>(`/User/{0}`);
};

export const useUsersGridProps = (users: GetUsersResponse, openRoleChange: Function): [GridRowsProp, GridColDef[]] => {
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
    deleteUser(userId);
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
      width: 60
    },
    {
      headerName: "Email",
      field: "email",
      minWidth: 150,
      flex: 1,
      renderCell: (params) => <Link to={`/users/${params.row.id}`}>{params.row.email}</Link>
    },
    {
      headerName: "Full Name",
      field: "fullName",
      minWidth: 150,
      flex: 1,
    },
    {
      headerName: "Country",
      field: "country",
      minWidth: 150,
      flex: 1,
    },
    {
      headerName: "Affiliation",
      field: "affiliation",
      minWidth: 150,
      flex: 1,
    },
    {
      headerName: "Roles",
      field: "roles",
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          <Tooltip title={params.value.join(", ")} enterDelay={500}>
            <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {params.value.join(", ")}
            </div>
          </Tooltip>
        </div>
      ),
    },
    {
      field: "actions",
      type: "actions",
      width: 100,
      getActions: (params) => [
        <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={() => handleDelete(params.row.id)} />,
        <GridActionsCellItem
          icon={<ManageAccountsIcon />}
          label="Manage Roles"
          onClick={() => openRoleChange(params.row)}
        />,
      ],
    },
  ];

  return [rows, columns];
};
