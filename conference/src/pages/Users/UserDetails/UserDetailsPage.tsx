import { useParams } from "react-router";
import { UserDetails } from "../../../components/UserDetails/UserDetails";
import { useGetUserApi } from "./UserDetailsPage.hooks";
import { UserDetailsPageProps } from "./UserDetailsPage.types";

export const UserDetailsPage = ({ id }: UserDetailsPageProps) => {
  const { userId } = useParams();
  const response = useGetUserApi(id ?? Number(userId));

  return (
    response.data
      ?
      <>
        <UserDetails user={response.data} />
      </>
      :
      <h3>User not found</h3>
  );
}