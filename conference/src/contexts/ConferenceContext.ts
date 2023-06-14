import React from "react";

type ConferenceContextType = {
  conferenceId: number,
  setConferenceId: (id: number) => void
}

export const defaultValue: ConferenceContextType = {
  conferenceId: 0,
  setConferenceId() { }
}

export const ConferenceContext = React.createContext<ConferenceContextType>(defaultValue);