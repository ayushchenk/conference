import { useMemo } from "react";
import { useGetApi } from "../../hooks/UseGetApi"
import { PageData } from "../../types/ApiResponse"
import { User } from "../../types/User"
import { GridActionsCellItem, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDeleteApi } from "../../hooks/UseDeleteApi";
import { usePostApi } from "../../hooks/UsePostApi";
import { useMemoPaging } from "../../hooks/UseMemoPaging";

export const useGetSubmissionReviewersApi = (submissionId: number, paging: GridPaginationModel) => {
  const config = useMemoPaging(paging);
  return useGetApi<PageData<User>>(`/submission/${submissionId}/reviewers`, config);
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
      maxWidth: 200,
      flex: 1
    },
    {
      headerName: "Name",
      field: "fullName",
      maxWidth: 200,
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