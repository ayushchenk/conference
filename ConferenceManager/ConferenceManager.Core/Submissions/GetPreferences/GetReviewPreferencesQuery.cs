using ConferenceManager.Core.Account.Common;
using ConferenceManager.Core.Common.Queries;

namespace ConferenceManager.Core.Submissions.GetPreferences
{
    public class GetReviewPreferencesQuery : GetEntitiesQuery<UserDto>
    {
        public int SubmissionId { get; }

        public GetReviewPreferencesQuery(int submissionId)
        {
            SubmissionId = submissionId;
        }
    }
}
