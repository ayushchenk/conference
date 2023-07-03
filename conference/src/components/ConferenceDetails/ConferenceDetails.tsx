import moment from "moment";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { AuthorVisibility } from "../ProtectedRoute/AuthorVisibility";
import { FormHeader } from "../FormHeader";
import { Box, Divider, IconButton, Tooltip, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Conference } from "../../types/Conference";
import { Auth } from "../../logic/Auth";
import { AnyRoleVisibility } from "../ProtectedRoute/AnyRoleVisibility";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ConferenceJoinCodes } from "./ConferenceInviteCodes";
import PostAddIcon from '@mui/icons-material/PostAdd';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ListIcon from '@mui/icons-material/List';

export const ConferenceDetails = ({ conference }: { conference: Conference }) => {
  const navigate = useNavigate();

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButton onClick={() => navigate(`/`)}>
          <ArrowBackIcon />
        </IconButton>
        <FormHeader>{conference.title}</FormHeader>
        <AnyRoleVisibility roles={["Admin", "Chair"]}>
          <IconButton onClick={() => navigate(`/conferences/${conference.id}/edit`)}>
            <EditIcon />
          </IconButton>
        </AnyRoleVisibility>
      </Box>
      {(conference.isParticipant || Auth.isAdmin()) &&
        <>
          <Divider />
          <Box>
            <AnyRoleVisibility roles={["Admin", "Chair"]}>
              <Button sx={{ mr: 3 }} startIcon={<PeopleAltIcon />} onClick={() => navigate(`/conferences/${conference.id}/participants`)}>
                Participants
              </Button>
            </AnyRoleVisibility>
            <Button sx={{ mr: 3 }} startIcon={<ListIcon />} onClick={() => navigate(`/conferences/${conference.id}/submissions`)}>
              Submissions
            </Button>
            <AuthorVisibility>
              <Button sx={{ mr: 3 }} startIcon={<PostAddIcon />} onClick={() => navigate(`/conferences/${conference.id}/submissions/new`)}>
                Create Submission
              </Button>
            </AuthorVisibility>
          </Box>
          <Divider />
        </>
      }
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
                  title={<Typography variant="body2">Anonymized file should not contain any references to the authors of the submission, so fair and not biased review process can be guaranteed</Typography>}>
                  <IconButton sx={{ padding: 0, ml: 1 }} >
                    <InfoOutlinedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </TableCell>
              <TableCell>
                {String(conference.isAnonymizedFileRequired)}
              </TableCell>
            </TableRow>
            <AnyRoleVisibility roles={["Admin", "Chair"]}>
              <ConferenceJoinCodes conferenceId={conference.id} />
            </AnyRoleVisibility>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
