import { Box, Typography } from "@mui/material";
import { PropsWithChildren, memo, useEffect, useState } from "react";

export const NoRowsOverlay = memo(({ children }: PropsWithChildren) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  if (!show) {
    return null;
  }

  return (
    <Box sx={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Typography variant="body2">{children}</Typography>
    </Box>
  );
});