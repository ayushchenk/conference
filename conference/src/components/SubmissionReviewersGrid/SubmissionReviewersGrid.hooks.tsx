import { useMemo, useContext } from "react";
import { useGetApi } from "../../hooks/UseGetApi"
import { User } from "../../types/User"
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDeleteApi } from "../../hooks/UseDeleteApi";
import { usePostApi } from "../../hooks/UsePostApi";
import { useConferenceId } from "../../hooks/UseConferenceId";
import { SubmissionContext } from "../../contexts/SubmissionContext";

export const useGetSubmissionReviewersApi = (submissionId: number) => {
  return useGetApi<User[]>(import.meta.env.VITE_SUBMISSION_API_URL + `/submission/${submissionId}/reviewers`);
}

export const useGetConferenceReviewersApi = (submissionId: number) => {
  const conferenceId = useConferenceId();
  return useGetApi<User[]>(import.meta.env.VITE_CONFERENCE_API_URL + `/conference/${conferenceId}/reviewers/${submissionId}`);
}

export const useRemoveSubmissionReviewerApi = (submissionId: number) => {
  return useDeleteApi<{}, {}>(import.meta.env.VITE_SUBMISSION_API_URL + `/submission/${submissionId}/reviewers/{0}`);
}

export const useAddSubmissionReviewerApi = (submissionId: number) => {
  return usePostApi<{}, {}>(import.meta.env.VITE_SUBMISSION_API_URL + `/submission/${submissionId}/reviewers/{0}`);
}

export const useSubmissionReviewersGridColumns = (
  onReviewerDelete: (user: User) => void
): GridColDef[] => {
  const { isClosed } = useContext(SubmissionContext);

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
          disabled={isClosed}
          onClick={() => onReviewerDelete(params.row)} />]
      )
    }
  ]), [onReviewerDelete, isClosed]);
}