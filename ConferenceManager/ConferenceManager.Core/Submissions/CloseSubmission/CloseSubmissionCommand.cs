using ConferenceManager.Domain.Enums;
using MediatR;

namespace ConferenceManager.Core.Submissions.CloseSubmission
{
    public class CloseSubmissionCommand : IRequest
    {
        public int SubmissionId { get; }

        public SubmissionStatus Status { get; }

        public CloseSubmissionCommand(int submissionId, SubmissionStatus status)
        {
            SubmissionId = submissionId;
            Status = status;
        }
    }
}
