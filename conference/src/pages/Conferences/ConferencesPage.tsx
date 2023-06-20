import { Box, Container, Link } from "@mui/material";
import { ConferencesGrid } from "../../components/ConferencesGrid";
import { FormHeader } from "../../components/FormHeader";
import { useState } from "react";
import { JoinConferenceDialog } from "../../components/JoinConferenceDialog";

export const ConferencesPage = () => {
  const [joinDialogOpen, setJoinDialogOpen] = useState(false);

  return (
    <Container>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <FormHeader >
          Your conferences
        </FormHeader>
        <Link
          component="button"
          variant="body1"
          onClick={() => setJoinDialogOpen(true)}
        >
          Join using code
        </Link>
      </Box>
      <ConferencesGrid />
      <JoinConferenceDialog
        open={joinDialogOpen}
        onClose={() => setJoinDialogOpen(false)}
        onSuccess={() => window.location.reload()}
      />
    </Container>
  );
}