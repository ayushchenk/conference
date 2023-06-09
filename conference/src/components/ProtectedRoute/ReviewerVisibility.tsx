import { Auth } from "../../logic/Auth";
import { ProtectedProps } from "./Protected";

export const ReviewerVisibility = (props: ProtectedProps) => {
  if (Auth.isAuthed() && Auth.isReviewer()) {
    return <>{props.children}</>;
  }
  return null;
};
