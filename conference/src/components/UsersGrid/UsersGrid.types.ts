import { User } from "../../types/User";
import { ApiResponse, PageData } from "../../types/ApiResponse";

export type GetUsersData = PageData<User>;
export type GetUsersResponse = ApiResponse<GetUsersData>;

export type AdjustUserRoleRequest = {
  role: string;
};

export interface UserRoleManagementDialogProps {
  open: boolean;
  user: User | null;
  onClose: () => void;
  onRoleChange: (user: User, roles: string[]) => void
}
