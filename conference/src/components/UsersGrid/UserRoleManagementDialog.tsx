import { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, Box, Autocomplete, Chip, TextField } from "@mui/material";
import { UserRoleManagementDialogProps } from "./UsersGrid.types";
import { userRoles } from "../../util/Constants";

export const UserRoleManagementDialog: React.FC<UserRoleManagementDialogProps> = ({
  open,
  user,
  onClose,
  onAddRole,
  onRemoveRole,
}) => {
  const [roles, setRoles] = useState<string[]>(user?.roles || ["test"]);

  const handleRoleChange = (event: React.ChangeEvent<{}>, value: string | string[]) => {
    value = Array.isArray(value) ? value : [];
    if (user) {
      const addedRole = value.find((role) => !roles.includes(role));
      const removedRole = roles.find((role) => !value.includes(role));

      if (addedRole) {
        onAddRole(user.id, addedRole);
      }

      if (removedRole) {
        onRemoveRole(user.id, removedRole);
      }
    }

    setRoles(value);
  };

  useEffect(() => {
    setRoles(user?.roles || []);
  }, [user]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update Roles for {user?.fullName}</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 3 }}>
          <Autocomplete
            multiple
            id="roles-input"
            limitTags={3}
            sx={{ m: 1 }}
            options={userRoles}
            value={roles}
            onChange={handleRoleChange}
            disableClearable
            renderTags={(value, getTagProps) =>
              value.map((tag, index) => <Chip label={tag} {...getTagProps({ index })} />)
            }
            renderInput={(params) => (
              <TextField {...params} label="Roles" variant="outlined" placeholder="Select Roles" />
            )}
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
};
