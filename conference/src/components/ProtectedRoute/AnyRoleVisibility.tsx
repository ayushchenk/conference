import { useConferenceId } from "../../hooks/UseConferenceId";
import { Auth } from "../../logic/Auth";
import { AnyRoleProtectedProps } from "./AnyRoleProtected";

export const AnyRoleVisibility = (props: AnyRoleProtectedProps) => {
  const conferenceId = useConferenceId();

  if (Auth.hasAnyRole(conferenceId, props.roles)) {
    return <>{props.children}</>;
  }

  return null;
};
