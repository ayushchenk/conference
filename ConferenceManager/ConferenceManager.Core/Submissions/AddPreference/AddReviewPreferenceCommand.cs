using MediatR;

namespace ConferenceManager.Core.Submissions.AddPreference
{
    public class AddReviewPreferenceCommand : IRequest
    {
        public int SubmissionId { get; }

        public AddReviewPreferenceCommand(int submissionId)
        {
            SubmissionId = submissionId;
        }
    }
}
