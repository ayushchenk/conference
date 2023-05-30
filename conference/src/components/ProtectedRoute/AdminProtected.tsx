import { Navigate } from "react-router-dom";
import { Auth } from "../../logic/Auth";
import { ProtectedProps } from "./Protected";

export const AdminProtected = (props: ProtectedProps) => {
  if (!Auth.isAdmin()) {
    return <Navigate to="/" replace />;
  }
  return <>{props.children}</>;
};
