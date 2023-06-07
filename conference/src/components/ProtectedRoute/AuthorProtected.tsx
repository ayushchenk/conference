import { Navigate } from "react-router-dom";
import { Auth } from "../../logic/Auth";
import { ProtectedProps } from "./Protected";

export const AuthorProtected = (props: ProtectedProps) => {
  if (!Auth.isAuthor()) {
    return <Navigate to="/" replace />;
  }
  return <>{props.children}</>;
};
