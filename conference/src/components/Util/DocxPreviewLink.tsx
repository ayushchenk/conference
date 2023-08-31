import { Button, Dialog, DialogActions, DialogContent, LinearProgress, Link, DialogTitle, Box, IconButton, Alert } from "@mui/material";
import { sleep } from "../../util/Functions";
import { renderAsync } from "docx-preview";
import { useState, useRef } from "react";
import CloseIcon from '@mui/icons-material/Close';

interface DocxPreviewLinkProps {
  file: File | Blob;
}

export const DocxPreviewLink = ({ file, children }: React.PropsWithChildren<DocxPreviewLinkProps>) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState("");
  const [dialogLoading, setDialogLoading] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Link component="p" variant="body2" onClick={async () => {
        try {
          setOpenDialog(true);
          setDialogLoading(true);
          setDialogContent("");

          //force div to be rendered
          await sleep(0);
          await renderAsync(file, dialogRef.current!);

          setDialogLoading(false);
        }
        catch (error) {
          console.error(error);
          setDialogLoading(false);
          setDialogContent("Could not load file, perhaps file is not .docx");
        }
      }}>{children}</Link>
      <Dialog
        maxWidth="lg"
        fullWidth
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        scroll="paper">
        <DialogTitle>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            {children}
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setOpenDialog(false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Alert severity="info">Preview is not 100% accurate</Alert>
        </DialogTitle>
        <DialogContent>
          {dialogLoading && <LinearProgress />}
          {!dialogLoading && dialogContent}
          <div ref={dialogRef} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}