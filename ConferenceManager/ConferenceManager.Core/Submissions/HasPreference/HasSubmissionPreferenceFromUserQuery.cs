using ConferenceManager.Core.Common.Model.Responses;
using MediatR;

namespace ConferenceManager.Core.Submissions.HasPreference
{
    public class HasSubmissionPreferenceFromUserQuery : IRequest<BoolResponse>
    {
        public int SubmissionId { get; }

        public HasSubmissionPreferenceFromUserQuery(int submissionId)
        {
            SubmissionId = submissionId;
        }
    }
}
