import { useGetConferenceApi } from "./ConferenceDetails.hooks";
import { useParams } from "react-router-dom";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TableBody from "@mui/material/TableBody";
import { Link } from "react-router-dom";
import moment from "moment";

export const ConferenceDetails = () => {
  const { conferenceId } = useParams();
  const conference = useGetConferenceApi(Number(conferenceId));

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableBody>
          <TableRow>
            <TableCell variant="head">Title</TableCell>
            <TableCell>{conference.data?.title}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">Acronym</TableCell>
            <TableCell>{conference.data?.acronym}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">Abstract</TableCell>
            <TableCell
              style={{
                whiteSpace: "normal",
                wordBreak: "break-word",
              }}
            >
              {conference.data?.abstract}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">Area Notes</TableCell>
            <TableCell
              style={{
                whiteSpace: "normal",
                wordBreak: "break-word",
              }}
            >
              {conference.data?.areaNotes}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">Keywords</TableCell>
            <TableCell>{conference.data?.keywords}</TableCell>
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
            <TableCell variant="head">Primary Research Area</TableCell>
            <TableCell>{conference.data?.primaryResearchArea}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">Secondary Research Area</TableCell>
            <TableCell>{conference.data?.secondaryResearchArea}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">City</TableCell>
            <TableCell>{conference.data?.city}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">Venue</TableCell>
            <TableCell>{conference.data?.venue}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">Webpage</TableCell>
            <TableCell>{conference.data?.webpage}</TableCell>
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
            <TableCell align="center" colSpan={12} variant="head">
              <Button color="inherit">
                <Link className="header__link" to={`/conferences/${conferenceId}/participants`}>
                  Participants
                </Link>
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
