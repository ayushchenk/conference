import { useConferenceId } from "../../hooks/UseConferenceId";
import { Auth } from "../../util/Auth";
import { ProtectedProps } from "./Protected";

export const ChairVisibility = (props: ProtectedProps) => {
  const conferenceId = useConferenceId();

  if (Auth.isChair(conferenceId)) {
    return <>{props.children}</>;
  }
  return null;
};
