import axios from "axios";
import { useEffect, useState } from "react";
import { GetConferenceResponse } from "./ConferenceDetails.types";

export const useGetConferenceApi = (conferenceId: number) => {
  const [response, setResponse] = useState<GetConferenceResponse>({
    data: null,
    isError: false,
    isLoading: true,
  });

  useEffect(() => {
    axios
      .get(`/Conference/${conferenceId}`)
      .then((response) => {
        setResponse({
          data: response.data,
          isError: false,
          isLoading: false,
        });
      })
      .catch((error) => {
        console.error(error);
        setResponse({
          data: null,
          isError: true,
          isLoading: false,
        });
      });
  }, [conferenceId]);

  return response;
};
