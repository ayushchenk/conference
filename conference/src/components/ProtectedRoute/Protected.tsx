import { Navigate } from "react-router-dom";
import { Auth } from "../../logic/Auth";

interface ProtectedProps {
  children: React.ReactNode;
}

export const Protected: React.FC<ProtectedProps> = ({ children }) => {
  if (!Auth.isAuthed()) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};
