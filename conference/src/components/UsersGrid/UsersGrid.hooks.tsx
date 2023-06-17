import { useMemo } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  GridActionsCellItem,
  GridColDef,
  GridPaginationModel,
} from "@mui/x-data-grid";
import { useDeleteApi } from "../../hooks/UseDeleteApi";
import { useGetApi } from "../../hooks/UseGetApi";
import { useMemoPaging } from "../../hooks/UseMemoPaging";
import { usePostApi } from "../../hooks/UsePostApi";
import { AdjustUserRoleRequest, GetUsersData, GetUsersResponse } from "./UsersGrid.types";
import { Link } from "react-router-dom";
import { User } from "../../types/User";
import { Checkbox } from "@mui/material";

export const useAddUserRoleApi = () => {
  return usePostApi<AdjustUserRoleRequest, {}>("/User/{0}/role");
};

export const useRemoveUserRoleApi = () => {
  return useDeleteApi<AdjustUserRoleRequest, {}>("/User/{0}/role");
};

export const useAddUserAdminRoleApi = () => {
  return usePostApi<{}, {}>('/User/{0}/role/admin');
};

export const useRemoveUserAdminRoleApi = () => {
  return useDeleteApi<{}, {}>('/User/{0}/role/admin');
};

export const useGetUsersApi = (paging: GridPaginationModel): GetUsersResponse => {
  const config = useMemoPaging(paging);
  return useGetApi<GetUsersData>(`/User`, config);
};

export const useDeleteUserApi = () => {
  return useDeleteApi<{}, {}>(`/User/{0}`);
};

export const useUsersGridColumns = (
  handleDelete: (user: User) => void,
  handleRoleChange: (user: User, checked: boolean) => void
): GridColDef[] => {
  return useMemo(() => {
    return [
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
        headerName: "Is Admin",
        field: "isAdmin",
        width: 100,        
        renderCell: (params) =>
          <Checkbox
            checked={params.row.isAdmin}
            value={params.row.isAdmin}
            onChange={(event) => handleRoleChange(params.row, event.target.checked)} />
      },
      {
        field: "actions",
        type: "actions",
        width: 100,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => handleDelete(params.row)}
          />
        ]
      },
    ];
  }, [handleDelete, handleRoleChange]);
};
