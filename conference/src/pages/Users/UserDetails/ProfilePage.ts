import { Auth } from "../../../logic/Auth"
import { UserDetailsPage } from "./UserDetailsPage";

export const ProfilePage = () => {
  return UserDetailsPage({ id: Auth.getId() ?? -1 });
}