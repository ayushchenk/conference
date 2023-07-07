import { useParams } from "react-router";
import { UserDetails } from "../../../components/UserDetails/UserDetails";
import { useGetUserApi } from "./UserDetailsPage.hooks";
import { UserDetailsPageProps } from "./UserDetailsPage.types";
import { LoadingSpinner } from "../../../components/LoadingSpinner";
import { FormErrorAlert2 } from "../../../components/FormErrorAlert";

export const UserDetailsPage = ({ id }: UserDetailsPageProps) => {
  const { userId } = useParams();
  const user = useGetUserApi(id ?? Number(userId));

  if (user.isLoading) {
    return <LoadingSpinner />;
  }

  if (user.error) {
    return <FormErrorAlert2 error={user.error} />;
  }

  return <UserDetails user={user.data!} />;
}