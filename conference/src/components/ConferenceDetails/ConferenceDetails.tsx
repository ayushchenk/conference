import moment from "moment";
import { Link, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { AdminVisibility } from "../ProtectedRoute/AdminVisibility";
import { useGetConferenceApi } from "./ConferenceDetails.hooks";
import { AuthorVisibility } from "../ProtectedRoute/AuthorVisibility";
import { FormHeader } from "../FormHeader";
import { IconButton, Tooltip, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export const ConferenceDetails = () => {
  const { conferenceId } = useParams();
  const conference = useGetConferenceApi(Number(conferenceId));

  return (
    <>
      <FormHeader>
        <span>{conference.data?.title}</span>
        <AdminVisibility>
          <IconButton>
            <Link className="header__link" to={`/conferences/${conferenceId}/edit`} >
              <EditIcon >
              </EditIcon>
            </Link>
          </IconButton>
        </AdminVisibility>
      </FormHeader>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableBody>
            <TableRow>
              <TableCell variant="head">Acronym</TableCell>
              <TableCell>{conference.data?.acronym}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">Keywords</TableCell>
              <TableCell>{conference.data?.keywords}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">Abstract</TableCell>
              <TableCell
                style={{
                  whiteSpace: "pre-line",
                  wordBreak: "break-word",
                }}
              >
                {conference.data?.abstract}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">Webpage</TableCell>
              <TableCell>{conference.data?.webpage}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">Venue</TableCell>
              <TableCell>{conference.data?.venue}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">City</TableCell>
              <TableCell>{conference.data?.city}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">Start Date</TableCell>
              <TableCell>{moment(conference.data?.startDate).format("DD/MM/YYYY")}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">End Date</TableCell>
              <TableCell>{moment(conference.data?.endDate).format("DD/MM/YYYY")}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">Research Areas</TableCell>
              <TableCell>
                {conference.data?.researchAreas.map((area, index) => (
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
                {conference.data?.areaNotes}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">Organizer</TableCell>
              <TableCell>{conference.data?.organizer}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">Organizer Webpage</TableCell>
              <TableCell>{conference.data?.organizerWebpage}</TableCell>
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
                {String(conference.data?.isAnonymizedFileRequired)}
              </TableCell>
            </TableRow>
            {
              conference.data?.isParticipant &&
              <>
                <TableRow>
                  <TableCell align="center" colSpan={12} variant="head">
                    <Button color="inherit">
                      <Link className="header__link" to={`/conferences/${conferenceId}/submissions`}>
                        Submissions
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
                <AdminVisibility>
                  <TableRow>
                    <TableCell align="center" colSpan={12} variant="head">
                      <Button color="inherit">
                        <Link className="header__link" to={`/conferences/${conferenceId}/participants`}>
                          Participants
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                </AdminVisibility>
                <AuthorVisibility>
                  <TableRow>
                    <TableCell align="center" colSpan={12} variant="head">
                      <Button color="inherit">
                        <Link className="header__link" to={`/conferences/${conferenceId}/submissions/new`}>
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
    </>
  );
};
