import { useContext } from "react";
import { Auth } from "../../logic/Auth";
import { ProtectedProps } from "./Protected";
import { ConferenceContext } from "../../contexts/ConferenceContext";

export const AuthorVisibility = (props: ProtectedProps) => {
  const { conferenceId } = useContext(ConferenceContext);

  if (Auth.isAuthed() && Auth.isAuthor(conferenceId)) {
    return <>{props.children}</>;
  }
  return null;
};
