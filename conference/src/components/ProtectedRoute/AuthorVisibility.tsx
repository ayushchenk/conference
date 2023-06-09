import { useConferenceId } from "../../hooks/UseConferenceId";
import { Auth } from "../../util/Auth";
import { ProtectedProps } from "./Protected";

export const AuthorVisibility = (props: ProtectedProps) => {
  const conferenceId = useConferenceId();

  if (Auth.isAuthor(conferenceId)) {
    return <>{props.children}</>;
  }
  return null;
};
