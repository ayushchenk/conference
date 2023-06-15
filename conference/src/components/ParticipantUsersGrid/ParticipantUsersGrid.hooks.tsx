import AddIcon from "@mui/icons-material/Add";
import { GridColDef, GridActionsCellItem } from "@mui/x-data-grid";
import { useMemo } from "react";

export const useParticipantUsersGridProps = (handleAddParticipant: Function): GridColDef[] => {
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
    ]
  }, [handleAddParticipant]);
};
