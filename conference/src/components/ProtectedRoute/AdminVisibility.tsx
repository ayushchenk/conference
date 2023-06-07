import { Auth } from "../../logic/Auth";
import { ProtectedProps } from "../ProtectedRoute/Protected";

export const AdminVisibility = (props: ProtectedProps) => {
  if (Auth.isAuthed() && Auth.isAdmin()) {
    return <>{props.children}</>;
  }
  return null;
};
