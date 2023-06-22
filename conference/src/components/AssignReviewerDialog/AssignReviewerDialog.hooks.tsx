import { useMemo } from "react";
import { useConferenceId } from "../../hooks/UseConferenceId";
import { useGetApi } from "../../hooks/UseGetApi";
import { User } from "../../types/User";
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import { usePostApi } from "../../hooks/UsePostApi";

export const useGetConferenceReviewersApi = () => {
  const conferenceId = useConferenceId();
  return useGetApi<User[]>(`/conference/${conferenceId}/reviewers`);
}

export const useAddSubmissionReviewerApi = (submissionId: number) => {
  return usePostApi<{}, {}>(`/submission/${submissionId}/reviewers/{0}`);
}

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
      field: "preference",
      minWidth: 150,
      flex: 1
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
  ]), [onAddReviewer]);
}