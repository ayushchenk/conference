using MediatR;

namespace ConferenceManager.Core.Submissions.AddPreference
{
    public class AddSubmissionPreferenceCommand : IRequest
    {
        public int SubmissionId { get; }

        public AddSubmissionPreferenceCommand(int submissionId)
        {
            SubmissionId = submissionId;
        }
    }
}
