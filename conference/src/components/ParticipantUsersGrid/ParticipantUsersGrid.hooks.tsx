import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { GridRowsProp, GridColDef, GridActionsCellItem } from "@mui/x-data-grid";
import { GetParticipantUsersResponse } from "./ParticipantUsersGrid.types";
import { User } from "../../types/User";

export const useParticipantUsersGridProps = (
  users: GetParticipantUsersResponse,
  handleAddParticipant: Function
): [GridRowsProp, GridColDef[]] => {
  const [rows, setRows] = useState<User[]>(users.data?.items ?? []);

  useEffect(() => {
    if (!users.isLoading && !users.isError) {
      setRows(users.data?.items ?? []);
    }
  }, [users]);

  const columns: GridColDef[] = [
    {
      headerName: "#",
      field: "id",
      type: "number",
    },
    {
      headerName: "Email",
      field: "email",
      width: 120,
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
      width: 20,
      flex: 1,
      getActions: (params) => {
        const handleAddClick = () => {
          handleAddParticipant(params.row);
        };
        return [<GridActionsCellItem icon={<AddIcon />} label="Add" onClick={handleAddClick} />];
      },
    },
  ];

  return [rows, columns];
};
