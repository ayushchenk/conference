import { useCallback, useContext, useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { Box, IconButton, Paper, Typography } from "@mui/material";
import { Review } from "../../types/Conference";
import { useGetReviewsApi } from "./SubmissionDetails.hooks";
import { UpdateReviewDialog } from "./UpdateReviewDialog";
import moment from "moment";
import { SubmissionContext } from "../../contexts/SubmissionContext";

export const ReviewsList = () => {
  const [rows, setRows] = useState<Review[]>([]);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const { submissionId, isClosed } = useContext(SubmissionContext);
  const reviews = useGetReviewsApi(submissionId);

  const handleEditClick = useCallback((review: Review) => {
    setEditingReview(review);
    setOpenDialog(true);
  }, []);

  const handleClose = useCallback(() => {
    setEditingReview(null);
    setOpenDialog(false);
  }, []);

  useEffect(() => {
    if (reviews.data) {
      setRows(reviews.data);
    }
  }, [reviews]);

  const onUpdate = useCallback((review: Review) => {
    setRows((prevRows) => {
      const newRows = [...prevRows];
      const index = newRows.findIndex((r) => r.id === review.id);
      newRows[index] = review;
      return newRows;
    });
  }, []);

  if (reviews.data && rows.length === 0) {
    return <Box display="flex" justifyContent="center">No reviews uploaded yet</Box>;
  }

  return (
    <>
      {rows.map((review) => (
        <Paper
          key={review.reviewerEmail}
          sx={{
            marginTop: 1,
            padding: 2,
          }}
        >
          <Box sx={{ marginBottom: 2, display: "flex", justifyContent: "space-between" }}>
            <Box>
              <Typography variant="subtitle2">Score: {review.score}</Typography>
              <Typography variant="subtitle2">{review.confidenceLabel} confidence</Typography>
            </Box>
            {review.isAuthor && !isClosed && (
              <IconButton onClick={() => handleEditClick(review)}>
                <EditIcon />
              </IconButton>
            )}
          </Box>
          <Typography
            variant="body2"
            sx={{
              fontStyle: "italic",
              marginBottom: 1,
              whiteSpace: "pre-line",
              wordBreak: "break-word",
            }}
          >
            {review.evaluation}
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ marginTop: 2 }}>
            Reviewer: {review.reviewerName}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {moment(review.createdOn).local().format("DD/MM/YYYY HH:mm:ss")} {review.isModified && <i>Edited</i>}
          </Typography>
        </Paper>
      ))}
      <UpdateReviewDialog review={editingReview} open={openDialog} onUpdate={onUpdate} onClose={handleClose} />
    </>
  );
};
