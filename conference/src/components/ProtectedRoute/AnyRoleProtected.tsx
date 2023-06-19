import { Navigate } from "react-router-dom";
import { Auth } from "../../logic/Auth";
import { PropsWithChildren } from "react";
import { useConferenceId } from "../../hooks/UseConferenceId";

export interface AnyRoleProtectedProps extends PropsWithChildren {
  roles: string[];
}

export const AnyRoleProtected: React.FC<AnyRoleProtectedProps> = ({ roles, children }) => {
  const conferenceId = useConferenceId();

  if (!Auth.hasAnyRole(conferenceId, roles)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
