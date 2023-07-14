import { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, Box, Autocomplete, Chip, TextField } from "@mui/material";
import { UserRoleManagementDialogProps } from "./UsersGrid.types";
import { userRoles } from "../../util/Constants";
import { getConferenceRoles } from "../../util/Functions";
import { useConferenceId } from "../../hooks/UseConferenceId";
import { useAddUserRoleApi, useRemoveUserRoleApi } from "./UsersGrid.hooks";
import { FormApiErrorAlert } from "../FormErrorAlert";

export const UserRoleManagementDialog: React.FC<UserRoleManagementDialogProps> = ({
  open,
  user,
  onClose,
  onRoleChange
}) => {
  const conferenceId = useConferenceId();
  const [roles, setRoles] = useState<string[]>(getConferenceRoles(user, conferenceId));
  const { response: postResponse, post: addRole } = useAddUserRoleApi();
  const { response: deleteResponse, performDelete: removeRole } = useRemoveUserRoleApi();

  useEffect(() => {
    setRoles(getConferenceRoles(user, conferenceId));
  }, [user, conferenceId]);

  const handleRoleChange = (_: React.ChangeEvent<{}>, value: string | string[]) => {
    const newValue = Array.isArray(value) ? value : [];

    if (user) {
      const addedRole = newValue.find((role) => !roles.includes(role));
      const removedRole = roles.find((role) => !newValue.includes(role));

      if (addedRole) {
        addRole({ role: addedRole }, user.id);
      }

      if (removedRole) {
        removeRole({ role: removedRole }, user.id);
      }

      onRoleChange(user, newValue);
    }

    setRoles(newValue);
  };

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
        <FormApiErrorAlert response={postResponse} />
        <FormApiErrorAlert response={deleteResponse} />
      </DialogContent>
    </Dialog>
  );
};
