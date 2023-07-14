import { useParams } from "react-router";
import { UserDetails } from "../../../components/UserDetails/UserDetails";
import { useGetUserApi } from "./UserDetailsPage.hooks";
import { UserDetailsPageProps } from "./UserDetailsPage.types";
import { LoadingSpinner } from "../../../components/LoadingSpinner";
import { FormSwrErrorAlert } from "../../../components/FormErrorAlert";

export const UserDetailsPage = ({ id }: UserDetailsPageProps) => {
  const { userId } = useParams();
  const user = useGetUserApi(id ?? Number(userId));

  if (user.isLoading) {
    return <LoadingSpinner />;
  }

  if (user.error) {
    return <FormSwrErrorAlert response={user} />;
  }

  return <UserDetails user={user.data!} />;
}