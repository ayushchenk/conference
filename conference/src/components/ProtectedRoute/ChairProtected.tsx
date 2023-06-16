import { Navigate } from "react-router-dom";
import { Auth } from "../../logic/Auth";
import { ProtectedProps } from "./Protected";
import { useConferenceId } from "../../hooks/UseConferenceId";

export const ChairProtected = (props: ProtectedProps) => {
  const conferenceId = useConferenceId();

  if (!Auth.isChair(conferenceId)) {
    return <Navigate to="/" replace />;
  }
  return <>{props.children}</>;
};
