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
      <TableCell variant="head"> {inviteCode.role} Invite Code </TableCell>
      <TableCell>
        {codeVisible(inviteCode.role) && <>
          <label>{inviteCode.code}</label>
          <Tooltip enterDelay={0} title="Copy to clipboard">
            <IconButton sx={{ ml: 2 }} onClick={() => navigator.clipboard.writeText(inviteCode.code)}>
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip enterDelay={0} title="Regenerate code">
            <IconButton onClick={() => refreshCode(inviteCode)}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </>}
        <IconButton onClick={() => handleCodeClick(inviteCode.role)}>
          {codeVisible(inviteCode.role)
            ? <VisibilityOffIcon />
            : <VisibilityIcon />
          }
        </IconButton>
      </TableCell>
    </TableRow>
  );

  return (
    <>
      {codeRows}
      <FormErrorAlert response={refreshResponse} />
    </>
  );
}