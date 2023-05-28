import axios from "axios";
import { useCallback, useState } from "react";
import { CreateConferenceRequest, CreateConferenceResponse } from "./CreateConferenceForm.types";

export const usePostCreateConferenceApi = () => {
  const [response, setResponse] = useState<CreateConferenceResponse>({
    data: null,
    isError: false,
    isLoading: true,
  });

  const post = useCallback((data: CreateConferenceRequest) => {
    axios
      .post("/Conference", data)
      .then((response) => {
        setResponse({
          data: response.data,
          isError: false,
          isLoading: false,
        });
      })
      .catch((error) => {
        setResponse({
          data: null,
          isError: true,
          isLoading: false,
        });
      });
  }, []);

  return { data: response.data, isError: response.isError, isLoading: response.isLoading, post: post };
};
