import { UserDetailsProps } from "./UserDetails.types";

export const UserDetails = ({ user }: UserDetailsProps) => {
  return (
    <h1>{user.fullName}</h1>
  );
} 