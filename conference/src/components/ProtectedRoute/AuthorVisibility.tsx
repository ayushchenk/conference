import { Auth } from "../../logic/Auth";
import { ProtectedProps } from "./Protected";

export const AuthorVisibility = (props: ProtectedProps) => {
  if (Auth.isAuthed() && Auth.isAuthor()) {
    return <>{props.children}</>;
  }
  return null;
};
