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

export const useUsersGridColumns = (handleDelete: (userId: number) => void): GridColDef[] => {
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
        field: "actions",
        type: "actions",
        width: 100,
        getActions: (params) => [
          <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={() => handleDelete(params.row.id)} />,
        ],
      },
    ];
  }, [handleDelete]);
};
