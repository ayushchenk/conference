import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { DeleteUserResponse, GetUsersResponse } from "./UsersGrid.types";
import { GridRowsProp, GridColDef, GridPaginationModel, GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { User } from "../../types/User";

export const useGetUsersApi = (paging: GridPaginationModel) => {
  const [response, setResponse] = useState<GetUsersResponse>({
    data: { items: [], totalCount: 0, totalPages: 0 },
    isError: false,
    isLoading: true,
  });

  useEffect(() => {
    axios
      .get(`/User`, { params: { pageIndex: paging["page"], pageSize: paging["pageSize"] } })
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
          data: { items: [], totalCount: 0, totalPages: 0 },
          isError: true,
          isLoading: false,
        });
      });
  }, [paging]);

  return response;
};

export const useDeleteUserApi = () => {
  const [response, setResponse] = useState<DeleteUserResponse>({
    data: { userId: null },
    isError: false,
    isLoading: true,
  });

  const deleteUser = useCallback((userId: number) => {
    axios
      .delete(`/User/${userId}`)
      .then((response) => {
        setResponse({
          data: { userId: userId },
          isError: false,
          isLoading: false,
        });
      })
      .catch((error) => {
        console.error(error);
        setResponse({
          data: { userId: userId },
          isError: true,
          isLoading: false,
        });
      });
  }, []);

  return { data: response.data, isError: response.isError, isLoading: response.isLoading, deleteUser: deleteUser };
};

export const useUsersGridProps = (users: GetUsersResponse): [GridRowsProp, GridColDef[]] => {
  const [rows, setRows] = useState<User[]>(users.data.items);
  const { data: deleteData, isError: isDeleteError, isLoading: isDeleteLoading, deleteUser } = useDeleteUserApi();

  useEffect(() => {
    if (!users.isLoading && !users.isError) {
      setRows(users.data.items);
    }
  }, [users]);

  useEffect(() => {
    if (!isDeleteError && !isDeleteLoading) {
      setRows((prevRows) => prevRows.filter((row) => row.id !== deleteData.userId));
    }
  }, [deleteData, isDeleteError, isDeleteLoading]);

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
        <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={() => deleteUser(params.row.id)} />,
        <GridActionsCellItem icon={<AddIcon />} label="Add to Conference" showInMenu />,
      ],
    },
  ];

  return [rows, columns];
};