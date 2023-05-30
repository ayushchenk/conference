using MediatR;

namespace ConferenceManager.Core.Submissions.AddReviewer
{
    public class AddReviewerCommand : IRequest
    {
        public int SubmissionId { get; }

        public int UserId { get; }

        public AddReviewerCommand(int submissionId, int userId)
        {
            SubmissionId = submissionId;
            UserId = userId;
        }
    }
}
