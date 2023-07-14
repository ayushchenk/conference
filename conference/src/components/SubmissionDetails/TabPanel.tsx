import { TabPanelProps } from "./SubmissionDetails.types";
import { useEffect, useState } from "react";
import { useTabContext } from "@mui/lab/TabContext";

export function TabPanel(props: TabPanelProps) {
  const { children, value } = props;

  const context = useTabContext();

  if (context === null) {
    throw new Error("No TabContext provided");
  }

  const [visited, setVisited] = useState(false);

  useEffect(() => {
    if (context.value === value) {
      setVisited(true);
    }
  }, [context.value, value]);

  return (
    <div
      style={{
        height: context.value === value ? "auto" : 0,
        visibility: context.value === value ? "visible" : "hidden",
      }}
    >
      {visited && children}
    </div>
  )
}