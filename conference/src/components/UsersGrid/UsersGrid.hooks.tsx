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
import { AdminVisibility } from "../ProtectedRoute/AdminVisibility";
import { AdjustUserRoleRequest, GetUsersData, GetUsersResponse } from "./UsersGrid.types";

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
    deleteUser({}, userId);
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
      width: 80,
      flex: 1,
      getActions: (params) => [
        <AdminVisibility>
          <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={() => handleDelete(params.row.id)} />
          <GridActionsCellItem
            icon={<ManageAccountsIcon />}
            label="Manage Roles"
            onClick={() => openRoleChange(params.row)}
          />
        </AdminVisibility>,
      ],
    },
  ];

  return [rows, columns];
};
