import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom"
import { ConferenceContext } from "../contexts/ConferenceContext";

export const useConferenceIdParam = (): number => {
  const { conferenceId } = useParams();
  const id = Number(conferenceId);

  const { setConferenceId } = useContext(ConferenceContext);

  useEffect(() => {
    setConferenceId(id);
  }, []);

  return id;
}