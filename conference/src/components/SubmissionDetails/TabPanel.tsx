import Box from "@mui/material/Box";
import { TabPanelProps } from "./SubmissionDetails.types";

export function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} {...other}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
}
