import { useParams } from "react-router-dom";

export const useSubmissionId = (): number => {
  const { submissionId } = useParams();
  return Number(submissionId);
};
