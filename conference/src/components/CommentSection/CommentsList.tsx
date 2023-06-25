import { Paper, Box, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { CommentsListProps } from "./CommentSection.types";
import moment from "moment";

export const CommentsList = ({ comments }: CommentsListProps) => {
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
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="subtitle2">{comment.authorName}</Typography>
            {comment.isAuthor &&
              <IconButton>
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
            {moment(comment.createdOn).local().format("DD/MM/YYYY hh:mm:ss")}
            {
              comment.isModified &&
              <i style={{marginLeft: 10}}>Edited</i>
            }
          </Typography>
        </Paper>
      ))}
    </>
  );
}