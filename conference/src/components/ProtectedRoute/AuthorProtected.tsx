import { Navigate } from "react-router-dom";
import { Auth } from "../../util/Auth";
import { ProtectedProps } from "./Protected";
import { useConferenceId } from "../../hooks/UseConferenceId";

export const AuthorProtected = (props: ProtectedProps) => {
  const conferenceId = useConferenceId();

  if (!Auth.isAuthor(conferenceId)) {
    return <Navigate to="/" replace />;
  }
  return <>{props.children}</>;
};
