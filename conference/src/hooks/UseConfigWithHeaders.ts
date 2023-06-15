import { AxiosRequestConfig } from "axios";
import { useMemo } from "react";
import { headers } from "../util/Constants";
import { useConferenceId } from "./UseConferenceId";

export function useConfigWithHeaders(config: AxiosRequestConfig<any> | undefined) {
  const conferenceId = useConferenceId();

  const configWithHeaders: AxiosRequestConfig<any> = useMemo(() => ({
    ...config,
    headers: {
      [headers.conference]: conferenceId
    }
  }), [config, conferenceId]);

  return configWithHeaders;
}