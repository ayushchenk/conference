import { Navigate } from "react-router-dom";
import { Auth } from "../../logic/Auth";
import { ProtectedProps } from "./Protected";
import { useContext } from "react";
import { ConferenceContext } from "../../contexts/ConferenceContext";

export const AuthorProtected = (props: ProtectedProps) => {
  const { conferenceId } = useContext(ConferenceContext);

  if (!Auth.isAuthor(conferenceId)) {
    return <Navigate to="/" replace />;
  }
  return <>{props.children}</>;
};
