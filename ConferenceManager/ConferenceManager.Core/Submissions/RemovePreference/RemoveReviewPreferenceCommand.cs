using MediatR;

namespace ConferenceManager.Core.Submissions.RemovePreference
{
    public class RemoveReviewPreferenceCommand : IRequest
    {
        public int SubmissionId { get; }

        public RemoveReviewPreferenceCommand(int submissionId)
        {
            SubmissionId = submissionId;
        }
    }
}
