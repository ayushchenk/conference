import { Paper, Box, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { CommentsListProps } from "./CommentSection.types";
import moment from "moment";
import { useCallback, useContext, useEffect, useState } from "react";
import { Comment } from "../../types/Conference";
import { UpdateCommentDialog } from "./UpdateCommentDialog";
import { useDeleteSubmissionCommentApi } from "./CommentSection.hooks";
import DeleteIcon from '@mui/icons-material/Delete';
import { SubmissionContext } from "../../contexts/SubmissionContext";

export const CommentsList = ({ comments, onUpdate, onDelete }: CommentsListProps) => {
  const { isClosed } = useContext(SubmissionContext);
  const [editingComment, setEditingComment] = useState<Comment | null>(null);
  const [deletingComment, setDeletingComment] = useState<Comment | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const { response, performDelete } = useDeleteSubmissionCommentApi();

  const handleEditClick = useCallback((comment: Comment) => {
    setEditingComment(comment);
    setOpenDialog(true);
  }, []);

  const handleDeleteClick = useCallback((comment: Comment) => {
    setDeletingComment(comment);
    performDelete({}, comment.id);
  }, [performDelete]);

  const handleClose = useCallback(() => {
    setEditingComment(null);
    setOpenDialog(false);
  }, []);

  useEffect(() => {
    if (response.status === "success" && deletingComment) {
      onDelete(deletingComment);
      setDeletingComment(null);
    }
  }, [response, deletingComment, onDelete]);

  return (
    <>
      {comments.map((comment) => (
        <Paper
          key={comment.id}
          sx={{
            marginTop: 1,
            padding: 2,
          }}
        >
          <Box sx={{ marginBottom: 2, display: "flex", justifyContent: "space-between" }}>
            <Typography variant="subtitle2">{comment.authorName}</Typography>
            {comment.isAuthor && !isClosed &&
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <IconButton onClick={() => handleEditClick(comment)} sx={{padding: 0, paddingLeft: 1}}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDeleteClick(comment)} sx={{padding: 0, paddingLeft: 1}}>
                  <DeleteIcon />
                </IconButton>
              </Box>
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