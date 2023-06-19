import moment from "moment";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { AuthorVisibility } from "../ProtectedRoute/AuthorVisibility";
import { FormHeader } from "../FormHeader";
import { IconButton, Tooltip, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Conference } from "../../types/Conference";
import { Auth } from "../../logic/Auth";
import { useIsParticipantApi } from "../../hooks/UserHooks";
import { AnyRoleVisibility } from "../ProtectedRoute/AnyRoleVisibility";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useCallback, useEffect, useState } from "react";
import { useGetInviteCodesApi, useRefreshCodeApi } from "./ConferenceDetails.hooks";
import { CodeVisibility } from "./ConferenceDetails.types";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { FormErrorAlert } from "../FormErrorAlert";
import RefreshIcon from '@mui/icons-material/Refresh';

export const ConferenceDetails = ({ conference }: { conference: Conference }) => {
  const isParticipant = useIsParticipantApi();
  const inviteCodesResponse = useGetInviteCodesApi(conference.id);
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
        console.log(newCodes);
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

  return (
    <>
      <FormHeader>
        <span>{conference.title}</span>
        <AnyRoleVisibility roles={["Admin", "Chair"]}>
          <IconButton>
            <Link className="header__link" to={`/conferences/${conference.id}/edit`} >
              <EditIcon >
              </EditIcon>
            </Link>
          </IconButton>
        </AnyRoleVisibility>
      </FormHeader>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableBody>
            <TableRow>
              <TableCell variant="head">Acronym</TableCell>
              <TableCell>{conference.acronym}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">Keywords</TableCell>
              <TableCell>{conference.keywords}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">Abstract</TableCell>
              <TableCell
                style={{
                  whiteSpace: "pre-line",
                  wordBreak: "break-word",
                }}
              >
                {conference.abstract}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">Webpage</TableCell>
              <TableCell>{conference.webpage}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">Venue</TableCell>
              <TableCell>{conference.venue}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">City</TableCell>
              <TableCell>{conference.city}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">Start Date</TableCell>
              <TableCell>{moment(conference.startDate).format("DD/MM/YYYY")}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">End Date</TableCell>
              <TableCell>{moment(conference.endDate).format("DD/MM/YYYY")}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">Research Areas</TableCell>
              <TableCell>
                {conference.researchAreas.map((area, index) => (
                  <div key={index}>{area}</div>
                ))}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">Research Area Notes</TableCell>
              <TableCell
                style={{
                  whiteSpace: "pre-line",
                  wordBreak: "break-word",
                }}
              >
                {conference.areaNotes}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">Organizer</TableCell>
              <TableCell>{conference.organizer}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">Organizer Webpage</TableCell>
              <TableCell>{conference.organizerWebpage}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">
                Anonymized File Requried
                <Tooltip
                  arrow
                  enterDelay={0}
                  leaveDelay={100}
                  title={<Typography variant="body1">Anonymized file should not contain any references to the authors of the submission, so fair and not biased review process can be guaranteed</Typography>}>
                  <IconButton>
                    <InfoOutlinedIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
              <TableCell>
                {String(conference.isAnonymizedFileRequired)}
              </TableCell>
            </TableRow>
            <AnyRoleVisibility roles={["Admin", "Chair"]}>
              {inviteCodes.map(inviteCode =>
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
              )}
            </AnyRoleVisibility>
            {
              (isParticipant || Auth.isAdmin()) &&
              <>
                <TableRow>
                  <TableCell align="center" colSpan={12} variant="head">
                    <Button color="inherit">
                      <Link className="header__link" to={`/conferences/${conference.id}/submissions`}>
                        Submissions
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
                {
                  (Auth.isAdmin() || Auth.isChair(conference.id)) &&
                  <TableRow>
                    <TableCell align="center" colSpan={12} variant="head">
                      <Button color="inherit">
                        <Link className="header__link" to={`/conferences/${conference.id}/participants`}>
                          Participants
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                }
                <AuthorVisibility>
                  <TableRow>
                    <TableCell align="center" colSpan={12} variant="head">
                      <Button color="inherit">
                        <Link className="header__link" to={`/conferences/${conference.id}/submissions/new`}>
                          Create Submission
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                </AuthorVisibility>
              </>
            }
          </TableBody>
        </Table>
      </TableContainer>
      <FormErrorAlert response={refreshResponse} />
    </>
  );
};
