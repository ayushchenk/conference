import { Navigate } from "react-router-dom";

interface ProtectedProps {
  children: React.ReactNode;
}

export const Protected: React.FC<ProtectedProps> = ({ children }) => {
  if (!localStorage.getItem("accessToken")) {
    return <Navigate to="/sign-in" replace />;
  }
  return <>{children}</>;
};
