import { FormControlLabel, Checkbox } from "@mui/material";
import { useState, useEffect, useCallback } from "react";
import { useAddSubmissionPreferenceApi, useGetHasPreferenceApi, useRemoveSubmissionPreferenceApi } from "./SubmissionDetails.hooks";
import { PreferenceCheckboxProps } from "./SubmissionDetails.types";
import { FormErrorAlert, FormErrorAlert2 } from "../FormErrorAlert";

export const PreferenceCheckbox = ({ submissionId }: PreferenceCheckboxProps) => {
  const [preference, setPreference] = useState(false);

  const hasPreference = useGetHasPreferenceApi(submissionId);
  const addPreferenceApi = useAddSubmissionPreferenceApi(submissionId);
  const removePreferenceApi = useRemoveSubmissionPreferenceApi(submissionId);

  useEffect(() => {
    if (hasPreference.data) {
      setPreference(hasPreference.data.result);
    }
  }, [hasPreference]);

  const handlePreferenceChange = useCallback((checked: boolean) => {
    setPreference(checked);
    const action = checked ? addPreferenceApi.post : removePreferenceApi.performDelete;
    action({});
  }, [addPreferenceApi, removePreferenceApi]);

  if (hasPreference.error) {
    return null;
  }

  return (
    <>
      <FormControlLabel label={"I want to review this submission"} control={
        <Checkbox
          checked={preference}
          value={preference}
          onChange={(e) => handlePreferenceChange(e.target.checked)} />
      } />
      <FormErrorAlert2 error={hasPreference.error} />
      <FormErrorAlert response={addPreferenceApi.response} />
      <FormErrorAlert response={removePreferenceApi.response} />
    </>
  );
}