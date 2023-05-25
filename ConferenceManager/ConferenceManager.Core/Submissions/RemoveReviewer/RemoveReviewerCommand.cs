using MediatR;

namespace ConferenceManager.Core.Submissions.RemoveReviewer
{
    public class RemoveReviewerCommand : IRequest
    {
        public int SubmissionId { get; }

        public int UserId { get; }

        public RemoveReviewerCommand(int submissionId, int userId)
        {
            SubmissionId = submissionId;
            UserId = userId;
        }
    }
}
