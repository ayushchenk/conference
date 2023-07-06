import { Auth } from "../../../util/Auth"
import { UserDetailsPage } from "./UserDetailsPage";

export const ProfilePage = () => {
  return UserDetailsPage({ id: Auth.getId() ?? -1 });
}