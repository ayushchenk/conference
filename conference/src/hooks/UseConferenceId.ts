import { useMemo } from "react";
import { useParams } from "react-router-dom"

export const useConferenceId = (): number => {
  const { conferenceId } = useParams();

  const id = useMemo(() => Number(conferenceId), [conferenceId]);

  return id;
}