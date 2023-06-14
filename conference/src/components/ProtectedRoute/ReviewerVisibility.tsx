import { useContext } from "react";
import { ConferenceContext } from "../../contexts/ConferenceContext";
import { Auth } from "../../logic/Auth";
import { ProtectedProps } from "./Protected";

export const ReviewerVisibility = (props: ProtectedProps) => {
  const { conferenceId } = useContext(ConferenceContext);

  if (Auth.isAuthed() && Auth.isReviewer(conferenceId)) {
    return <>{props.children}</>;
  }
  return null;
};
