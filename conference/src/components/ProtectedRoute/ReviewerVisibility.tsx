import { useConferenceId } from "../../hooks/UseConferenceId";
import { Auth } from "../../util/Auth";
import { ProtectedProps } from "./Protected";

export const ReviewerVisibility = (props: ProtectedProps) => {
  const conferenceId = useConferenceId();

  if (Auth.isReviewer(conferenceId)) {
    return <>{props.children}</>;
  }
  return null;
};
