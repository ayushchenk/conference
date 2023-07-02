import { useMemo } from "react";
import { useGetApi } from "../../hooks/UseGetApi"
import { User } from "../../types/User"
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDeleteApi } from "../../hooks/UseDeleteApi";
import { usePostApi } from "../../hooks/UsePostApi";
import { useConferenceId } from "../../hooks/UseConferenceId";

export const useGetSubmissionReviewersApi = (submissionId: number) => {
  return useGetApi<User[]>(`/submission/${submissionId}/reviewers`);
}

export const useGetConferenceReviewersApi = (submissionId: number) => {
  const conferenceId = useConferenceId();
  return useGetApi<User[]>(`/conference/${conferenceId}/reviewers/${submissionId}`);
}

export const useRemoveSubmissionReviewerApi = (submissionId: number) => {
  return useDeleteApi<{}, {}>(`/submission/${submissionId}/reviewers/{0}`);
}

export const useAddSubmissionReviewerApi = (submissionId: number) => {
  return usePostApi<{}, {}>(`/submission/${submissionId}/reviewers/{0}`);
}

export const useSubmissionReviewersGridColumns = (
  onReviewerDelete: (user: User) => void
): GridColDef[] => {
  return useMemo(() => ([
    {
      headerName: "#",
      field: "id",
      width: 60,
      type: "number"
    },
    {
      headerName: "Email",
      field: "email",
      flex: 1,
    },
    {
      headerName: "Name",
      field: "fullName",
      flex: 1
    },
    {
      headerName: "Country",
      field: "country",
      flex: 1
    },
    {
      headerName: "Affiliation",
      field: "affiliation",
      flex: 1
    },
    {
      field: "actions",
      type: "actions",
      width: 50,
      getActions: (params) => (
        [<GridActionsCellItem
          icon={< DeleteIcon />}
          label="Remove"
          onClick={() => onReviewerDelete(params.row)} />]
      )
    }
  ]), [onReviewerDelete]);
}