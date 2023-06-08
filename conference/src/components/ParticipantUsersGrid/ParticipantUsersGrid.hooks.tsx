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
      width: 60
    },
    {
      headerName: "Email",
      field: "email",
      minWidth: 200,
      flex: 1
    },
    {
      headerName: "Full Name",
      field: "fullName",
      minWidth: 200,
      flex: 1
    },
    {
      headerName: "Country",
      field: "country",
      minWidth: 150,
      flex: 1
    },
    {
      headerName: "Affiliation",
      field: "affiliation",
      minWidth: 150,
      flex: 1
    },
    {
      headerName: "Roles",
      field: "roles",
      minWidth: 150,
      flex: 1
    },
    {
      field: "actions",
      type: "actions",
      width: 50,
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
