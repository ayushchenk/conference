import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container } from "@mui/material";
import { useGetConferenceApi } from "../../components/ConferenceDetails/ConferenceDetails.hooks";
import { CreateConferenceForm } from "../../components/CreateConferenceForm";
import { Conference } from "../../types/Conference";

export const UpdateConferencePage = () => {
  const { conferenceId } = useParams();
  const response = useGetConferenceApi(Number(conferenceId));
  const [conference, setConference] = useState<Conference | null>(null);

  useEffect(() => {
    if (!response.isLoading && !response.error && response.data) {
      setConference(response.data);
    }
  }, [response]);

  return (
    <Container>
      <h2>Update conference</h2>
      <CreateConferenceForm conference={conference} />
    </Container>
  );
};
