import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useConferenceId } from "../../hooks/UseConferenceId";
import { useSubmissionId } from "../../hooks/UseSubmissionId";
import { FormErrorAlert } from "../FormErrorAlert";
import { useGetReviewsApi } from "./SubmissionDetails.hooks";

export const ReviewsList = () => {
  const navigate = useNavigate();
  const submissionId = useSubmissionId();
  const conferenceId = useConferenceId();
  const reviews = useGetReviewsApi(Number(submissionId));

  if (reviews.status === "loading") {
    return null;
  }

  if (reviews.status === "error") {
    return <FormErrorAlert response={reviews} />;
  }

  return (
    <>
      {reviews?.data?.map((review) => (
        <Paper
          key={review.reviewerEmail}
          sx={{
            width: "100%",
            marginTop: 1,
            padding: 2,
          }}
        >
          <Box sx={{ marginBottom: 2, display: "flex", justifyContent: "space-between" }}>
            <Box>
              <Typography variant="subtitle2">Score: {review.score}</Typography>
              <Typography variant="subtitle2">{review.confidenceLabel} confidence</Typography>
            </Box>
            {review.isAuthor && (
              <IconButton
                onClick={() => navigate(`/conferences/${conferenceId}/submissions/${submissionId}/edit-review`)}
              >
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
        </Paper>
      ))}
    </>
  );
};
