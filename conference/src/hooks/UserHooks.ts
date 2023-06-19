import { useEffect, useState } from "react";
import { useConferenceId } from "./UseConferenceId"
import { useGetApi } from "./UseGetApi";
import { Auth } from "../logic/Auth";

export const useIsParticipantApi = () => {
  const [isParticipant, setIsParticipant] = useState(false);

  const conferenceId = useConferenceId();

  const isParticipantResponse = useGetApi<boolean>(`/user/${Auth.getId()}/is-participant/${conferenceId}`);

  useEffect(() => {
    if (isParticipantResponse.status === "success") {
      setIsParticipant(isParticipantResponse.data);
    }
  }, [isParticipantResponse]);

  return isParticipant;
}

export const useIsReviewerApi = (submissionId: number) => {
  const [isReviewer, setIsReviewer] = useState(false);

  const isReviewerResponse = useGetApi<boolean>(`/user/${Auth.getId()}/is-reviewer/${submissionId}`);

  useEffect(() => {
    if (isReviewerResponse.status === "success") {
      setIsReviewer(isReviewerResponse.data);
    }
  }, [isReviewerResponse]);

  return isReviewer;
} 