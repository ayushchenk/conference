import { TabPanelProps } from "./SubmissionDetails.types";
import { useEffect, useState } from "react";
import { useTabContext } from "@mui/lab/TabContext";
import { Box } from "@mui/system";

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

  const visible = context.value === value;

  return (
    <Box
      style={{
        marginTop: visible ? 15 : 0,
        height: visible ? "auto" : 0,
        display: visible ? "block" : "none"
      }}
    >
      {visited && children}
    </Box>
  )
}