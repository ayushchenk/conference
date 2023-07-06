import { useParams } from "react-router-dom"

export const useConferenceId = (): number => {
  const { conferenceId } = useParams();
  return Number(conferenceId);
}