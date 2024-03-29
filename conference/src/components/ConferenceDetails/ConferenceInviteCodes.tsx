import { TableRow, TableCell, Tooltip, IconButton } from "@mui/material"
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import RefreshIcon from '@mui/icons-material/Refresh';
import { CodeVisibility, ConferenceInviteCodesProps } from "./ConferenceDetails.types";
import { useState, useEffect, useCallback } from "react";
import { useGetInviteCodesApi, useRefreshCodeApi } from "./ConferenceDetails.hooks";
import { FormErrorAlert } from "../FormErrorAlert";

export const ConferenceJoinCodes = ({ conferenceId }: ConferenceInviteCodesProps) => {
  const inviteCodesResponse = useGetInviteCodesApi(conferenceId);
  const [inviteCodes, setInviteCodes] = useState<CodeVisibility[]>([]);
  const { response: refreshResponse, post: refreshCode } = useRefreshCodeApi();

  useEffect(() => {
    if (inviteCodesResponse.status === "success") {
      setInviteCodes(inviteCodesResponse.data.map(code => ({
        ...code,
        visible: false
      })));
    }
  }, [inviteCodesResponse]);

  useEffect(() => {
    if (refreshResponse.status === "success") {
      setInviteCodes(prevCodes => {
        const newCodes = [...prevCodes];
        const refreshedCode = newCodes.find(c => c.role === refreshResponse.data.role);
        if (refreshedCode) {
          refreshedCode.code = refreshResponse.data.code;
        }
        return newCodes;
      });
    }
  }, [refreshResponse]);

  const codeVisible = (role: string) =>
    inviteCodes.find(c => c.role === role)?.visible ?? false;

  const handleCodeClick = useCallback((role: string) => {
    setInviteCodes(prevCodes => {
      const newCodes = [...prevCodes];
      const clickedCode = newCodes.find(c => c.role === role);
      if (clickedCode) {
        clickedCode.visible = !clickedCode.visible;
      }
      return newCodes;
    });
  }, [setInviteCodes]);

  const codeRows = inviteCodes.map(inviteCode =>
    <TableRow key={inviteCode.role}>
      <TableCell variant="head"> {inviteCode.role + " Invite Code"}</TableCell>
      <TableCell>
        <div style={{ minWidth: 250 }}>
          {codeVisible(inviteCode.role) && <>
            <label>{inviteCode.code}</label>
            <Tooltip enterDelay={100} leaveDelay={100} title="Regenerate code">
              <IconButton sx={{ ml: 2, padding: 0 }} onClick={() => refreshCode(inviteCode)}>
                <RefreshIcon />
              </IconButton>
            </Tooltip>
          </>}
          <Tooltip enterDelay={100} leaveDelay={100} title="Copy to clipboard">
            <IconButton sx={{ ml: codeVisible(inviteCode.role) ? 2 : 0, padding: 0 }} onClick={() => navigator.clipboard.writeText(inviteCode.code)}>
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <IconButton onClick={() => handleCodeClick(inviteCode.role)} sx={{ ml: 2, padding: 0 }}>
            {codeVisible(inviteCode.role)
              ? <VisibilityOffIcon />
              : <VisibilityIcon />
            }
          </IconButton>
        </div>
      </TableCell>
    </TableRow >
  );

  return (
    <>
      {codeRows}
      <FormErrorAlert response={refreshResponse} />
    </>
  );
}