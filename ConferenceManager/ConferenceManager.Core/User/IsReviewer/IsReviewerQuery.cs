using MediatR;

namespace ConferenceManager.Core.User.IsReviewer
{
    public class IsReviewerQuery : IRequest<bool>
    {
        public int UserId { get; }

        public int SubmissionId { get; }

        public IsReviewerQuery(int userId, int submissionId)
        {
            UserId = userId;
            SubmissionId = submissionId;
        }
    }
}
