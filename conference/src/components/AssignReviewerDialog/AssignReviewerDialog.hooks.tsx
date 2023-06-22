import { useMemo } from "react";
import { User } from "../../types/User";
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import { Typography } from "@mui/material";

export const useConferenceReviewersGridColumns = (
  onAddReviewer: (user: User) => void
): GridColDef[] => {
  return useMemo(() => ([
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
      headerName: "Preference",
      field: "hasPreference",
      width: 150,
      renderCell: params => (params.row.hasPreference
        ? <Typography variant="body2" color={"green"}>Wants to review</Typography>
        : <Typography variant="body2">No preference</Typography>
      )
    },
    {
      field: "actions",
      type: "actions",
      width: 50,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<AddIcon />}
          label="Add"
          onClick={() => onAddReviewer(params.row)} />
      ]
    },
  ] as GridColDef[]), [onAddReviewer]);
}