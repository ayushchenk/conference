import { useParams } from "react-router";
import { UserDetails } from "../../../components/UserDetails/UserDetails";
import { useGetUserApi } from "./UserDetailsPage.hooks";
import { UserDetailsPageProps } from "./UserDetailsPage.types";
import { LoadingSpinner } from "../../../components/LoadingSpinner";
import { FormErrorAlert } from "../../../components/FormErrorAlert";

export const UserDetailsPage = ({ id }: UserDetailsPageProps) => {
  const { userId } = useParams();
  const response = useGetUserApi(id ?? Number(userId));

  if (response.status === "loading" || response.status === "not-initiated") {
    return <LoadingSpinner />;
  }

  if (response.status === "error") {
    return <FormErrorAlert response={response} />;
  }

  return <UserDetails user={response.data} />;
}