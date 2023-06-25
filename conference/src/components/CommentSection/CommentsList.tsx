import { Paper, Box, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { CommentsListProps } from "./CommentSection.types";
import moment from "moment";
import { useCallback, useState } from "react";
import { Comment } from "../../types/Conference";
import { UpdateCommentDialog } from "./UpdateCommentDialog";

export const CommentsList = ({ comments, onUpdate }: CommentsListProps) => {
  const [editingComment, setEditingComment] = useState<Comment | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleEditClick = useCallback((comment: Comment) => {
    setEditingComment(comment);
    setOpenDialog(true);
  }, []);

  const handleClose = useCallback(() => {
    setEditingComment(null);
    setOpenDialog(false);
  }, []);

  return (
    <>
      {comments.map((comment) => (
        <Paper
          key={comment.id}
          sx={{
            width: "100%",
            marginTop: 1,
            padding: 2,
          }}
        >
          <Box sx={{ marginBottom: 2, display: "flex", justifyContent: "space-between" }}>
            <Typography variant="subtitle2">{comment.authorName}</Typography>
            {comment.isAuthor &&
              <IconButton onClick={() => handleEditClick(comment)}>
                <EditIcon />
              </IconButton>
            }
          </Box>
          <Typography
            variant="body2"
            sx={{
              marginBottom: 1,
              whiteSpace: "pre-line",
              wordBreak: "break-word",
            }}
          >
            {comment.text}
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ marginTop: 2 }}>
            {moment(comment.createdOn).local().format("DD/MM/YYYY HH:mm:ss")}
            {
              comment.isModified &&
              <i style={{ marginLeft: 10 }}>Edited</i>
            }
          </Typography>
        </Paper>
      ))}
      <UpdateCommentDialog
        comment={editingComment}
        open={openDialog}
        onUpdate={onUpdate}
        onClose={handleClose}
      />
    </>
  );
}