import { User } from "../../types/User";
import { ApiResponse, PageData } from "../../types/ApiResponse";

export type GetUsersData = PageData<User>;
export type GetUsersResponse = ApiResponse<GetUsersData>;

export type AddUserRoleRequest = {
  role: string;
};

export type RemoveUserRoleRequest = {
  role: string;
};

export interface UserRoleManagementDialogProps {
  open: boolean;
  user: User | null;
  onClose: () => void;
  onAddRole: (userId: number, role: string) => void;
  onRemoveRole: (userId: number, role: string) => void;
}
