using ConferenceManager.Core.Account.Common;
using ConferenceManager.Core.Common.Queries;

namespace ConferenceManager.Core.Submissions.GetReviewers
{
    public class GetSubmissionReviewersQuery : GetEntitiesQuery<UserDto>
    {
        public int SubmissionId { get; }

        public GetSubmissionReviewersQuery(int id)
        {
            SubmissionId = id;
        }
    }
}
