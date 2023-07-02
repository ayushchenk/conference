import { useMemo } from "react";
import { useParams } from "react-router-dom";

export const useSubmissionId = (): number => {
  const { submissionId } = useParams();

  const id = useMemo(() => Number(submissionId), [submissionId]);

  return id;
};
